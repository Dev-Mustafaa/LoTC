import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `Sen İstanbul'da Medipol Üniversitesi'nde okuyan ve Sancaktepe'deki Mahmut Ökten Celaleddin Yurdu'nda kalan 1. sınıf öğrencilere yardımcı olan bir asistansın. Samimi, kısa ve pratik cevaplar ver. Türkçe konuş. Şehri yeni öğrenen bir öğrenciye abisi/ablası gibi davran.

Bildiğin bilgiler:
- Yurt: Mahmut Ökten Celaleddin Yurdu, Sancaktepe (KYK, ~1500 TL/ay)
- Okul: Medipol Üniversitesi, Kavacık Kampüsü, Beykoz
- Okula ulaşım: Minibüs → M4 Metrobüs → Servis (~58 dk, ~43-73 TL)
- 19S hattı 24 saat çalışıyor
- Sancaktepe kira: 1+1 için 20.000-32.000 TL
- En yakın hastane: Sancaktepe Eğitim Araştırma Hastanesi (2.1 km)
- KYK burs: 1700 TL/ay, İBB burs: 2000 TL/ay
- İSMEK kursları ücretsiz, kayıt Eylül-Ekim
- Kent lokantası: ~20 TL/öğün`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as {
            messages: { role: "user" | "assistant"; content: string }[];
          };

          if (!Array.isArray(messages) || messages.length === 0) {
            return Response.json({ error: "messages required" }, { status: 400 });
          }

          // ── n8n path ─────────────────────────────────────────────────────────
          const n8nUrl = process.env.N8N_WEBHOOK_URL;
          if (n8nUrl) {
            const upstream = await fetch(n8nUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                messages,
                sessionId: "asa-student",
                systemPrompt: SYSTEM_PROMPT,
              }),
            });

            if (!upstream.ok) {
              const t = await upstream.text();
              console.error("n8n error", upstream.status, t);
              return Response.json({ error: "n8n error" }, { status: 500 });
            }

            const data = (await upstream.json()) as
              | { output?: string; text?: string; reply?: string }
              | Array<{ output?: string; text?: string }>;

            const reply = Array.isArray(data)
              ? (data[0]?.output ?? data[0]?.text ?? JSON.stringify(data[0]))
              : (data.output ?? data.text ?? data.reply ?? JSON.stringify(data));

            return Response.json({ reply });
          }

          // ── Lovable AI Gateway fallback ───────────────────────────────────────
          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return Response.json(
              { error: "AI yapılandırılmamış. N8N_WEBHOOK_URL veya LOVABLE_API_KEY gerekli." },
              { status: 500 },
            );
          }

          const upstream = await fetch(
            "https://ai.gateway.lovable.dev/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "google/gemini-3-flash-preview",
                stream: false,
                messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
              }),
            },
          );

          if (!upstream.ok) {
            if (upstream.status === 429)
              return Response.json(
                { error: "Çok fazla istek geldi, biraz sonra tekrar dene." },
                { status: 429 },
              );
            if (upstream.status === 402)
              return Response.json({ error: "AI kredisi tükendi." }, { status: 402 });
            const t = await upstream.text();
            console.error("AI gateway error", upstream.status, t);
            return Response.json({ error: "AI gateway error" }, { status: 500 });
          }

          const data = (await upstream.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          const reply = data.choices?.[0]?.message?.content ?? "Bir hata oluştu.";
          return Response.json({ reply });
        } catch (e) {
          console.error("chat route error", e);
          return Response.json(
            { error: e instanceof Error ? e.message : "unknown" },
            { status: 500 },
          );
        }
      },
    },
  },
});
