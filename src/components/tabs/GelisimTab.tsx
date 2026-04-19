import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Palette,
  Library,
  Wifi,
  Calendar,
  ArrowRight,
  Info,
  CheckCircle2,
} from "lucide-react";

type Ismek = {
  name: string;
  address: string;
  distance: string;
  categories: string[];
  kayit: string;
  hours: string;
  url: string;
  registerUrl: string;
};

type LibraryItem = {
  name: string;
  address: string;
  distance: string;
  hours: string;
  wifi: boolean;
  wifiNote?: string;
  cabin?: boolean;
  note?: string;
  url: string;
  iconColor: "blue" | "green";
};

const ismekler: Ismek[] = [
  {
    name: "İSMEK Sancaktepe Merkezi",
    address: "Sancaktepe Merkez Mah., Sancaktepe / İstanbul",
    distance: "1.5 km",
    categories: ["Dil", "Bilgisayar", "El Sanatları", "Müzik", "Spor"],
    kayit: "Eylül–Ekim ve Şubat–Mart",
    hours: "Pazartesi–Cumartesi 09:00–18:00",
    url: "https://maps.google.com/?q=ISMEK+Sancaktepe",
    registerUrl: "https://ismek.ibb.gov.tr",
  },
  {
    name: "İSMEK Kartal Merkezi",
    address: "Kartal Merkez, İstanbul",
    distance: "4.2 km",
    categories: ["Dil", "Grafik Tasarım", "Fotoğrafçılık", "Tiyatro"],
    kayit: "Eylül–Ekim ve Şubat–Mart",
    hours: "Pazartesi–Cumartesi 09:00–18:00",
    url: "https://maps.google.com/?q=ISMEK+Kartal",
    registerUrl: "https://ismek.ibb.gov.tr",
  },
  {
    name: "İSMEK Pendik Merkezi",
    address: "Pendik Merkez, İstanbul",
    distance: "5.8 km",
    categories: ["Dil", "Mesleki Beceri", "Güzel Sanatlar"],
    kayit: "Eylül–Ekim ve Şubat–Mart",
    hours: "Pazartesi–Cumartesi 09:00–18:00",
    url: "https://maps.google.com/?q=ISMEK+Pendik",
    registerUrl: "https://ismek.ibb.gov.tr",
  },
];

const libraries: LibraryItem[] = [
  {
    name: "İBB Sancaktepe Kütüphanesi",
    address: "Sancaktepe Merkez Mah., Sancaktepe",
    distance: "1.3 km",
    hours: "Pazartesi–Cumartesi 09:00–21:00 | Pazar: Kapalı",
    wifi: true,
    cabin: true,
    iconColor: "blue",
    url: "https://maps.google.com/?q=IBB+Kutuphane+Sancaktepe",
  },
  {
    name: "Sancaktepe İlçe Halk Kütüphanesi",
    address: "Sarıgazi Mah., Sancaktepe",
    distance: "2.1 km",
    hours: "Pazartesi–Cuma 08:30–17:30",
    wifi: true,
    iconColor: "blue",
    url: "https://maps.google.com/?q=Sancaktepe+Halk+Kutuphanesi",
  },
  {
    name: "Medipol Üniversitesi Kütüphanesi",
    address: "Kavacık Kampüsü, Beykoz",
    distance: "Kampüs içi",
    hours: "Pazartesi–Cuma 08:00–22:00 | Cumartesi: 09:00–18:00",
    wifi: false,
    wifiNote: "Kampüs WiFi (öğrenci kartı gerekli)",
    note: "Öğrenci kimliğinizle ücretsiz erişim sağlayabilirsiniz.",
    iconColor: "green",
    url: "https://maps.google.com/?q=Medipol+Universitesi+Kavacik+Kampusu",
  },
];

const wifiSpots = [
  { name: "İBB WiFi (IBBWifi)", area: "Sancaktepe Meydanı ve ana caddelerde", access: "Ücretsiz" },
  { name: "Medipol Kampüs WiFi", area: "Tüm kampüs alanı", access: "Öğrenci kartı gerekli" },
  {
    name: "Sancaktepe Belediyesi WiFi",
    area: "Belediye binası çevresi",
    access: "Ücretsiz",
  },
];

export function GelisimTab() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">İSMEK & Kütüphaneler</h2>
        <p className="text-sm text-muted-foreground">Ücretsiz kurs ve çalışma alanları</p>
      </div>

      {/* SECTION 1: İSMEK */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          İSMEK Merkezleri
        </h3>

        <Alert className="border-success/30 bg-success-soft">
          <Info className="h-4 w-4 text-success" />
          <AlertDescription className="text-foreground">
            İSMEK kursları İBB tarafından ücretsiz veya çok düşük ücretli sunulmaktadır. Kayıt
            dönemlerini takip edin.
          </AlertDescription>
        </Alert>

        {ismekler.map((i) => (
          <Card key={i.name} className="space-y-2.5 p-4">
            <div className="flex gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-500/15">
                <Palette className="h-6 w-6 text-purple-500" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold leading-tight">{i.name}</p>
                  <Badge variant="secondary" className="shrink-0 text-[10px]">
                    {i.distance}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{i.address}</p>
                <p className="text-xs">{i.hours}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {i.categories.map((c) => (
                <Badge
                  key={c}
                  variant="secondary"
                  className="bg-purple-500/15 text-[10px] text-purple-700 dark:text-purple-300"
                >
                  {c}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-warning">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-medium">Kayıt: {i.kayit}</span>
            </div>

            <div className="flex gap-2 pt-1">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <a href={i.url} target="_blank" rel="noopener noreferrer">
                  Yol Tarifi <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                className="flex-1 bg-brand text-brand-foreground hover:bg-brand/90"
              >
                <a href={i.registerUrl} target="_blank" rel="noopener noreferrer">
                  Kayıt İçin <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* SECTION 2: Libraries */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Kütüphaneler
        </h3>

        {libraries.map((l) => {
          const bg = l.iconColor === "green" ? "bg-success-soft" : "bg-brand-soft";
          const color = l.iconColor === "green" ? "text-success" : "text-brand";
          return (
            <Card key={l.name} className="space-y-2.5 p-4">
              <div className="flex gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${bg}`}
                >
                  <Library className={`h-6 w-6 ${color}`} />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-tight">{l.name}</p>
                    <Badge variant="secondary" className="shrink-0 text-[10px]">
                      {l.distance}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{l.address}</p>
                  <p className="text-xs">{l.hours}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {l.wifi ? (
                  <Badge className="bg-success text-success-foreground border-transparent text-[10px]">
                    WiFi ✓
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-[10px]">
                    {l.wifiNote ?? "WiFi yok"}
                  </Badge>
                )}
                {l.cabin && (
                  <Badge className="bg-teal-500 text-white border-transparent text-[10px]">
                    Çalışma kabini mevcut
                  </Badge>
                )}
              </div>

              {l.note && (
                <div className="flex gap-1.5 rounded-md border border-warning/30 bg-warning-soft p-2">
                  <Info className="h-3.5 w-3.5 shrink-0 text-warning" />
                  <p className="text-[11px] leading-snug text-foreground">{l.note}</p>
                </div>
              )}

              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
              >
                Yol Tarifi Al <ArrowRight className="h-3 w-3" />
              </a>
            </Card>
          );
        })}
      </div>

      {/* SECTION 3: WiFi */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Ücretsiz WiFi Noktaları
        </h3>

        <Card className="divide-y divide-border p-0">
          {wifiSpots.map((w) => (
            <div key={w.name} className="flex gap-3 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft">
                <Wifi className="h-4 w-4 text-brand" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold">{w.name}</p>
                <p className="text-[11px] text-muted-foreground">{w.area}</p>
              </div>
              <div className="flex shrink-0 items-center">
                {w.access === "Ücretsiz" ? (
                  <Badge className="bg-success text-success-foreground border-transparent text-[10px]">
                    <CheckCircle2 className="mr-0.5 h-3 w-3" /> Ücretsiz
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-[10px]">
                    {w.access}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </Card>

        <p className="text-[11px] text-muted-foreground">
          IBBWifi'ye bağlanmak için kısa bir SMS doğrulaması gerekebilir.
        </p>
      </div>

      <Alert className="border-purple-500/30 bg-purple-500/10">
        <Info className="h-4 w-4 text-purple-500" />
        <AlertDescription className="text-foreground">
          İSMEK kayıt dönemleri açıldığında İBB'nin resmi sosyal medya hesaplarını takip edin.
          Kontenjanlar hızlı dolmaktadır.
        </AlertDescription>
      </Alert>
    </div>
  );
}
