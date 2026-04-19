import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Moon, AlertTriangle, Clock } from "lucide-react";

type Line = {
  name: string;
  route: string;
  type: "Özel Halk Otobüsü" | "Metrobüs" | "Özel Servis";
  is24h: boolean;
  hours?: string;
  firstDeparture?: string;
  lastDeparture?: string;
  dayInterval?: string;
  nightInterval?: string;
  note?: string;
};

const lines: Line[] = [
  {
    name: "19S",
    route: "Sancaktepe ↔ Bostancı",
    type: "Özel Halk Otobüsü",
    is24h: true,
    firstDeparture: "00:00",
    dayInterval: "her 20 dk",
    nightInterval: "her 40–60 dk",
  },
  {
    name: "M4 Metrobüsü",
    route: "Kadıköy ↔ Sabiha Gökçen",
    type: "Metrobüs",
    is24h: false,
    hours: "06:00 – 00:30",
    firstDeparture: "06:00",
    lastDeparture: "00:30",
  },
  {
    name: "Üniversite Servisi",
    route: "Kadıköy ↔ Medipol Kavacık",
    type: "Özel Servis",
    is24h: false,
    hours: "Ders saatlerine göre değişir",
    note: "Medipol öğrenci kartıyla ücretsiz/indirimli",
  },
];

const lineTypeClass: Record<Line["type"], string> = {
  "Özel Halk Otobüsü": "bg-vehicle-bus text-white border-transparent",
  "Metrobüs": "bg-vehicle-metro text-white border-transparent",
  "Özel Servis": "bg-vehicle-taxi text-white border-transparent",
};

type Step = {
  n: number;
  from: string;
  to: string;
  vehicle: "Minibüs" | "M4 Metrobüsü" | "Özel Servis / Taksi";
  duration: string;
  cost: string;
};

const steps: Step[] = [
  { n: 1, from: "Mahmut Ökten Yurdu", to: "Sancaktepe Terminal", vehicle: "Minibüs", duration: "8 dk", cost: "8 ₺" },
  { n: 2, from: "Sancaktepe Terminal", to: "Kadıköy", vehicle: "M4 Metrobüsü", duration: "30 dk", cost: "5 ₺" },
  { n: 3, from: "Kadıköy", to: "Kavacık / Medipol", vehicle: "Özel Servis / Taksi", duration: "20 dk", cost: "30–60 ₺" },
];

const vehicleClass: Record<Step["vehicle"], string> = {
  "Minibüs": "bg-vehicle-bus text-white border-transparent",
  "M4 Metrobüsü": "bg-vehicle-metro text-white border-transparent",
  "Özel Servis / Taksi": "bg-vehicle-taxi text-white border-transparent",
};

export function UlasimTab() {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(localStorage.getItem("routeSaved") === "true");
  }, []);

  const save = () => {
    localStorage.setItem("routeSaved", "true");
    setSaved(true);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Ulaşım</h2>
        <p className="text-sm text-muted-foreground">Yurttan okula adım adım</p>
      </div>

      <div className="relative space-y-3">
        {steps.map((s, i) => (
          <div key={s.n} className="relative">
            {i < steps.length - 1 && (
              <div className="absolute left-[19px] top-12 h-[calc(100%-8px)] w-0.5 bg-border" />
            )}
            <Card className="p-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
                  {s.n}
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <span className="truncate">{s.from}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate">{s.to}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={vehicleClass[s.vehicle]}>{s.vehicle}</Badge>
                    <span className="text-xs text-muted-foreground">{s.duration}</span>
                    <span className="text-xs font-semibold text-foreground">{s.cost}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Card className="border-l-4 border-l-brand bg-brand-soft p-4">
        <p className="text-sm font-semibold text-foreground">
          Toplam: ~58 dk · ~43–73 ₺
        </p>
      </Card>

      <div className="space-y-3 pt-2">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          <Clock className="h-4 w-4" /> Hat Saatleri
        </h3>
        <div className="space-y-3">
          {lines.map((l) => (
            <Card key={l.name} className="p-4 space-y-2">
              <div className="text-sm font-bold">
                {l.name} ({l.route})
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={lineTypeClass[l.type]}>{l.type}</Badge>
                {l.is24h ? (
                  <Badge className="bg-success text-success-foreground border-transparent">
                    24 Saat ✓
                  </Badge>
                ) : (
                  <Badge variant="secondary">{l.hours}</Badge>
                )}
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                {l.firstDeparture && (
                  <div>
                    <span className="font-medium text-foreground">İlk sefer:</span> {l.firstDeparture}
                  </div>
                )}
                {l.lastDeparture && (
                  <div>
                    <span className="font-medium text-foreground">Son sefer:</span> {l.lastDeparture}
                  </div>
                )}
                {l.dayInterval && (
                  <div>
                    <span className="font-medium text-foreground">Sefer aralığı (gündüz):</span>{" "}
                    {l.dayInterval}
                  </div>
                )}
                {l.nightInterval && (
                  <div>
                    <span className="font-medium text-foreground">Sefer aralığı (gece):</span>{" "}
                    {l.nightInterval}
                  </div>
                )}
              </div>
              {l.note && (
                <p className="text-xs italic text-muted-foreground">Not: {l.note}</p>
              )}
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          <Moon className="h-4 w-4" /> Gece Ulaşımı
        </h3>
        <Badge className="bg-success text-success-foreground border-transparent">
          19S hattı 24 saat boyunca çalışmaktadır
        </Badge>
        <p className="text-sm text-muted-foreground">
          Gece 00:30'dan sonra M4 metrobüsü kalkar. 19S ile Bostancı'ya gidip oradan taksi
          alabilirsiniz.
        </p>
        <div className="flex items-start gap-2 rounded-lg border border-warning/40 bg-warning-soft p-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning-foreground" />
          <p className="text-sm text-warning-foreground">
            Gece geç saatlerde tek başına seyahat etmemeye özen gösterin.
          </p>
        </div>
      </div>

      {saved ? (
        <div className="flex items-center justify-center gap-2 rounded-lg bg-success-soft py-3 text-sm font-semibold text-success">
          <Check className="h-4 w-4" /> Güzergah Kaydedildi
        </div>
      ) : (
        <Button className="w-full" onClick={save}>
          Güzergahı Kaydet
        </Button>
      )}
    </div>
  );
}
