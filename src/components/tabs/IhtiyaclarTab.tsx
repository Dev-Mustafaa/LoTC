import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FileText,
  Mail,
  ShoppingCart,
  Landmark,
  Cross,
  Info,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

type IconKey = "fileText" | "mail" | "cartAmber" | "cartBlue" | "cartRed" | "landmark" | "cross";

type Place = {
  name: string;
  address: string;
  hours: string;
  distance: string;
  note?: string;
  icon: IconKey;
  url: string;
};

type Category = {
  title: string;
  places: Place[];
};

const iconMap: Record<IconKey, { Icon: typeof FileText; bg: string; color: string }> = {
  fileText: { Icon: FileText, bg: "bg-brand-soft", color: "text-brand" },
  mail: { Icon: Mail, bg: "bg-warning-soft", color: "text-warning" },
  cartAmber: { Icon: ShoppingCart, bg: "bg-warning-soft", color: "text-warning" },
  cartBlue: { Icon: ShoppingCart, bg: "bg-brand-soft", color: "text-brand" },
  cartRed: { Icon: ShoppingCart, bg: "bg-danger-soft", color: "text-danger" },
  landmark: { Icon: Landmark, bg: "bg-success-soft", color: "text-success" },
  cross: { Icon: Cross, bg: "bg-success-soft", color: "text-success" },
};

const categories: Category[] = [
  {
    title: "Resmi İşlemler",
    places: [
      {
        name: "Sancaktepe Nüfus Müdürlüğü",
        address: "Sarıgazi Mah. Abdi İpekçi Cad. No:50, Sancaktepe",
        hours: "Pazartesi–Cuma 08:30–17:30",
        distance: "1.8 km",
        note: "Adres kaydı için randevu gerekebilir. e-Devlet üzerinden alabilirsiniz.",
        icon: "fileText",
        url: "https://maps.google.com/?q=Sancaktepe+Nufus+Mudurlugu",
      },
      {
        name: "PTT Sancaktepe Şubesi",
        address: "Sancaktepe Merkez Mah., Sancaktepe",
        hours: "Pazartesi–Cuma 09:00–17:00",
        distance: "1.2 km",
        icon: "mail",
        url: "https://maps.google.com/?q=PTT+Sancaktepe",
      },
    ],
  },
  {
    title: "Market & Alışveriş",
    places: [
      {
        name: "Migros Sancaktepe",
        address: "Sarıgazi Mah., Sancaktepe",
        hours: "Her gün 09:00–22:00",
        distance: "1.2 km",
        icon: "cartAmber",
        url: "https://maps.google.com/?q=Migros+Sancaktepe",
      },
      {
        name: "BİM Sancaktepe",
        address: "Sancaktepe Merkez",
        hours: "Her gün 09:00–21:00",
        distance: "0.6 km",
        icon: "cartBlue",
        url: "https://maps.google.com/?q=BIM+Sancaktepe",
      },
      {
        name: "A101 Sancaktepe",
        address: "Sancaktepe Merkez",
        hours: "Her gün 08:30–22:00",
        distance: "0.9 km",
        icon: "cartRed",
        url: "https://maps.google.com/?q=A101+Sancaktepe",
      },
    ],
  },
  {
    title: "Diğer",
    places: [
      {
        name: "Ziraat Bankası ATM / Şube",
        address: "Sancaktepe Merkez",
        hours: "ATM 7/24 | Şube: Pazartesi–Cuma 09:00–17:00",
        distance: "1.0 km",
        icon: "landmark",
        url: "https://maps.google.com/?q=Ziraat+Bankasi+Sancaktepe",
      },
      {
        name: "Eczane Güneş (24 Saat)",
        address: "Sancaktepe Merkez",
        hours: "24 Saat Açık",
        distance: "0.4 km",
        note: "Gece acil ilaç ihtiyacında en yakın 24 saat eczane.",
        icon: "cross",
        url: "https://maps.google.com/?q=Eczane+Gunes+Sancaktepe",
      },
    ],
  },
];

export function IhtiyaclarTab() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Temel İhtiyaçlar</h2>
        <p className="text-sm text-muted-foreground">
          Sancaktepe'de ilk haftada gidilecek yerler
        </p>
      </div>

      {categories.map((cat) => (
        <div key={cat.title} className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {cat.title}
          </h3>
          <div className="space-y-3">
            {cat.places.map((p) => {
              const { Icon, bg, color } = iconMap[p.icon];
              return (
                <Card key={p.name} className="p-4">
                  <div className="flex gap-3">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${bg}`}
                    >
                      <Icon className={`h-6 w-6 ${color}`} />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-tight">{p.name}</p>
                        <Badge variant="secondary" className="shrink-0 text-[10px]">
                          {p.distance}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{p.address}</p>
                      <p className="text-xs">{p.hours}</p>

                      {p.note && (
                        <div className="mt-2 flex gap-1.5 rounded-md border border-warning/30 bg-warning-soft p-2">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0 text-warning" />
                          <p className="text-[11px] leading-snug text-foreground">{p.note}</p>
                        </div>
                      )}

                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 pt-1 text-xs font-semibold text-brand hover:underline"
                      >
                        Yol Tarifi Al <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      <Alert className="border-brand/30 bg-brand-soft">
        <Info className="h-4 w-4 text-brand" />
        <AlertDescription className="text-foreground">
          Bu bilgiler Mahmut Ökten Celaleddin Yurdu'na yakınlık baz alınarak hazırlanmıştır.
          Adresler değişmiş olabilir, gitmeden önce Google Maps'te doğrulayın.
        </AlertDescription>
      </Alert>
    </div>
  );
}
