import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Okula nasıl giderim? 🚌",
  "Aylık bütçem ne olmalı? 💰",
  "Hangi burslara başvurabilirim? 🎓",
];

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setError(null);
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setIsLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || "request failed");
      }

      const data = (await resp.json()) as {
        reply?: string;
        output?: string;
        text?: string;
      };
      const reply =
        data.reply ?? data.output ?? data.text ?? "Anlamadım, tekrar dener misin?";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error(e);
      setError("Şu an bağlanamıyorum, biraz sonra tekrar dene 🙏");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-[76px] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#2563EB] shadow-lg shadow-blue-500/30 transition-all duration-200 active:scale-95 hover:bg-[#1d4ed8]"
        aria-label="Yapay Zeka Asistan"
      >
        <Sparkles className="h-6 w-6 text-white" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-1/2 z-[70] w-full max-w-[480px] -translate-x-1/2 overflow-hidden rounded-t-2xl bg-white shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "65dvh" }}
      >
        {/* Handle */}
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-[#E5E7EB]" />

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 pt-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EFF6FF]">
              <Sparkles className="h-4 w-4 text-[#2563EB]" />
            </div>
            <div>
              <div className="text-[15px] font-semibold text-black">Yapay Zeka Asistan</div>
              <div className="text-[11px] text-[#6B7280]">Sancaktepe &amp; Medipol rehberi</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="overflow-y-auto px-4 pb-2"
          style={{ height: "calc(65dvh - 128px)" }}
        >
          {messages.length === 0 && (
            <div className="space-y-3 pt-1">
              <p className="text-[13px] text-[#6B7280]">
                Bir şey sor ya da örneklerden seç:
              </p>
              <div className="flex flex-col gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-left text-[14px] text-black transition-colors active:bg-[#F2F2F7]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 pt-1">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in duration-200`}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-tr-sm bg-[#2563EB] px-3.5 py-2 text-[14px] leading-[1.4] text-white"
                      : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-[#F3F4F6] px-3.5 py-2 text-[14px] leading-[1.5] text-black"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm bg-[#F3F4F6] px-3.5 py-2.5">
                  <TypingDots />
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[13px] text-[#DC2626]">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-[#E5E7EB] px-4 py-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Bir şey sor..."
            className="h-10 flex-1 rounded-full border border-[#E5E7EB] bg-[#F2F2F7] px-4 text-[14px] text-black outline-none placeholder:text-[#9CA3AF] focus:border-[#2563EB]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white transition-opacity disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9CA3AF] [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9CA3AF] [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9CA3AF] [animation-delay:300ms]" />
    </span>
  );
}
