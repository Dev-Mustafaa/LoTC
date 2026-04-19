import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Home, Utensils, Bus, MoreHorizontal, MapPin, Info } from "lucide-react";

type RentOption = {
  id: string;
  title: string;
  range: string;
  avg: number;
  color: "kyk" | "blue" | "purple" | "amber" | "green" | "gray";
};

const rentOptions: RentOption[] = [
  { id: "kyk", title: "KYK Yurdu", range: "Sabit", avg: 1500, color: "kyk" },
  { id: "1+1", title: "1+1 Daire", range: "20.000 – 32.000 ₺", avg: 26000, color: "blue" },
  { id: "2+1", title: "2+1 Daire", range: "24.500 – 40.000 ₺", avg: 32000, color: "purple" },
  { id: "eski", title: "Eski Bina / Ara Sokak", range: "20.000 – 25.000 ₺", avg: 22500, color: "amber" },
  { id: "metro", title: "Metro Yakını / Yeni Site", range: "30.000 ₺ ve üzeri", avg: 35000, color: "green" },
  { id: "bodrum", title: "Bodrum / Eski Bina", range: "10.000 – 15.000 ₺", avg: 12500, color: "gray" },
];

const colorClass: Record<RentOption["color"], string> = {
  kyk: "text-success",
  blue: "text-vehicle-metro",
  purple: "text-[oklch(0.55_0.20_300)]",
  amber: "text-warning-foreground",
  green: "text-success",
  gray: "text-muted-foreground",
};

const lokantalar = [
  { name: "Sancaktepe Kent Lokantası", address: "Sancaktepe Meydanı No:12", price: "~20 ₺/öğün" },
  { name: "Pendik Kent Lokantası", address: "Pendik Merkez, Bağdat Cd.", price: "~20 ₺/öğün" },
  { name: "Kartal Kent Lokantası", address: "Kartal İskele Meydanı", price: "~20 ₺/öğün" },
];

export function ButceTab() {
  const [rentId, setRentId] = useState<string>("kyk");
  const [yemek, setYemek] = useState<"kent" | "disari">("kent");
  const [ulasim, setUlasim] = useState(900);
  const [diger, setDiger] = useState(400);

  const selectedRent = rentOptions.find((r) => r.id === rentId) ?? rentOptions[0];
  const RENT = selectedRent.avg;
  const isKyk = selectedRent.id === "kyk";

  const yemekVal = yemek === "kent" ? 900 : 2500;
  const total = RENT + yemekVal + ulasim + diger;

  const totalColor = useMemo(() => {
    if (total < 4000) return "text-success";
    if (total <= 6000) return "text-warning-foreground";
    return "text-danger";
  }, [total]);

  const totalBg = useMemo(() => {
    if (total < 4000) return "bg-success-soft";
    if (total <= 6000) return "bg-warning-soft";
    return "bg-danger-soft";
  }, [total]);

  const fmt = (n: number) => n.toLocaleString("tr-TR") + " ₺";

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Bütçe</h2>
        <p className="text-sm text-muted-foreground">Aylık tahmini giderlerin</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold">Sancaktepe Kira Rehberi</h3>
        <div className="-mx-4 overflow-x-auto px-4">
          <div className="flex gap-3 pb-2">
            {rentOptions.map((r) => {
              const selected = r.id === rentId;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRentId(r.id)}
                  className={`w-40 shrink-0 rounded-xl border p-3 text-left transition-colors ${
                    selected
                      ? "border-brand bg-brand-soft"
                      : "border-border bg-card hover:bg-muted/40"
                  }`}
                >
                  <p className="text-sm font-bold">{r.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{r.range}</p>
                  <p className={`mt-2 text-lg font-bold ${colorClass[r.color]}`}>
                    {fmt(r.avg)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5" />
          <span>Ortalama Aidat: 1.500 – 4.000 ₺/ay</span>
        </div>
        <p className="text-xs italic text-muted-foreground">
          * Fiyatlar 2025 yılı Sancaktepe piyasa ortalamasına göre tahminidir.
        </p>
      </div>

      <Card className={`p-4 ${isKyk ? "opacity-80" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Kira</p>
              <p className="text-xs text-muted-foreground">
                {isKyk ? "KYK yurdu (sabit)" : selectedRent.title}
              </p>
            </div>
          </div>
          <p className={`text-sm font-semibold ${isKyk ? "text-muted-foreground" : "text-foreground"}`}>
            {fmt(RENT)}
          </p>
        </div>
      </Card>

      <Card className="space-y-3 p-4">
        <div className="flex items-center gap-2">
          <Utensils className="h-4 w-4 text-brand" />
          <p className="text-sm font-medium">Yemek</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={yemek === "kent" ? "default" : "outline"}
            size="sm"
            onClick={() => setYemek("kent")}
            className="h-auto whitespace-normal py-2 text-xs"
          >
            Kent Lokantası<br />~900 ₺
          </Button>
          <Button
            variant={yemek === "disari" ? "default" : "outline"}
            size="sm"
            onClick={() => setYemek("disari")}
            className="h-auto whitespace-normal py-2 text-xs"
          >
            Dışarıda<br />~2.500 ₺
          </Button>
        </div>
      </Card>

      <Card className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bus className="h-4 w-4 text-brand" />
            <p className="text-sm font-medium">Ulaşım</p>
          </div>
          <p className="text-sm font-semibold">{fmt(ulasim)}</p>
        </div>
        <Slider
          value={[ulasim]}
          min={300}
          max={2000}
          step={50}
          onValueChange={(v) => setUlasim(v[0])}
        />
      </Card>

      <Card className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MoreHorizontal className="h-4 w-4 text-brand" />
            <p className="text-sm font-medium">Diğer</p>
          </div>
          <p className="text-sm font-semibold">{fmt(diger)}</p>
        </div>
        <Slider
          value={[diger]}
          min={200}
          max={1000}
          step={50}
          onValueChange={(v) => setDiger(v[0])}
        />
      </Card>

      <Card className={`p-5 text-center ${totalBg}`}>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Aylık Tahmini Bütçe
        </p>
        <p className={`mt-1 text-4xl font-bold ${totalColor}`}>{fmt(total)}</p>
      </Card>

      <div className="space-y-2 pt-2">
        <h3 className="text-base font-semibold">Kent Lokantaları</h3>
        {lokantalar.map((l) => (
          <Card key={l.name} className="p-3">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success-soft">
                <Utensils className="h-5 w-5 text-success" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{l.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {l.address}
                </p>
                <p className="mt-0.5 text-xs font-medium text-success">{l.price}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
