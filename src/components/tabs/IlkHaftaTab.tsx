import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

type Item = { id: number; text: string };
type Group = { title: string; items: Item[] };

const groups: Group[] = [
  {
    title: "Resmi İşlemler",
    items: [
      { id: 1, text: "Nüfus müdürlüğüne adres kaydı yaptır (Sancaktepe)" },
      { id: 2, text: "Öğrenci kimliği için üniversite kayıt ofisine git" },
      { id: 3, text: "SGK öğrenci kaydını kontrol et" },
    ],
  },
  {
    title: "Günlük Hayat",
    items: [
      { id: 4, text: "En yakın marketi keşfet (Migros Sancaktepe — 1.2 km)" },
      { id: 5, text: "Kent Lokantası'nı dene" },
      { id: 6, text: "Okula ilk gün rotayı canlı test et" },
      { id: 7, text: "PTT konumunu öğren (kargo ve para gönderme)" },
    ],
  },
  {
    title: "Burs",
    items: [
      { id: 8, text: "KYK burs başvurusu yap (Ekim sonuna kadar)" },
      { id: 9, text: "İBB öğrenci bursu araştır" },
      { id: 10, text: "Medipol burs ofisini ziyaret et" },
    ],
  },
];

const TOTAL = 10;
const STORAGE_KEY = "checklist";

export function IlkHaftaTab() {
  const [checked, setChecked] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const toggle = (id: number) => {
    setChecked((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const count = checked.length;
  const pct = Math.round((count / TOTAL) * 100);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">İlk Hafta</h2>
        <p className="text-sm text-muted-foreground">Yapılacaklar listen</p>
      </div>

      <Card className="space-y-2 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">
            {count} / {TOTAL} tamamlandı
          </span>
          <span className="font-bold text-brand">%{pct}</span>
        </div>
        <Progress value={pct} />
      </Card>

      {count === TOTAL && (
        <Card className="border-success/40 bg-success-soft p-4 text-center">
          <p className="text-sm font-semibold text-success">
            🎉 Harika! İlk haftanı başarıyla tamamladın!
          </p>
        </Card>
      )}

      {groups.map((g) => (
        <div key={g.title} className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {g.title}
          </h3>
          <Card className="divide-y divide-border p-0">
            {g.items.map((item) => {
              const isChecked = checked.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50"
                >
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      isChecked
                        ? "border-success bg-success"
                        : "border-muted-foreground/40 bg-transparent"
                    }`}
                  >
                    {isChecked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                  </div>
                  <span
                    className={`text-sm ${
                      isChecked ? "text-muted-foreground line-through" : "text-foreground"
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              );
            })}
          </Card>
        </div>
      ))}
    </div>
  );
}
