import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, AlertCircle, ArrowRight, Info } from "lucide-react";

type Category = "Devlet" | "Belediye" | "Vakıf" | "Özel";
type Filter = "Tümü" | Category;

type Burs = {
  name: string;
  category: Category;
  tutar: string;
  donem: string;
  url: string;
  note?: string;
};

const burslar: Burs[] = [
  {
    name: "KYK Burs (Yüksek Öğrenim Kredi ve Yurtlar Kurumu)",
    category: "Devlet",
    tutar: "1.700 ₺/ay (burs) | 2.000 ₺/ay (kredi)",
    donem: "Her yıl Eylül–Ekim",
    url: "https://burs.yurtlar.gov.tr",
    note: "Hem burs hem kredi başvurusu yapılabilir. Gelir şartı var.",
  },
  {
    name: "TÜBİTAK Lisans Bursu",
    category: "Devlet",
    tutar: "1.500 ₺/ay",
    donem: "Yıl içinde çeşitli dönemler",
    url: "https://www.tubitak.gov.tr/tr/burslar/lisans",
    note: "Başarı şartı yüksek. Bölüme göre değişir.",
  },
  {
    name: "Türkiye Bursları (YTB)",
    category: "Devlet",
    tutar: "1.800 ₺/ay",
    donem: "Şubat–Mart",
    url: "https://www.turkiyeburslari.gov.tr",
    note: "Yabancı uyruklu öğrenciler için de başvurulabilir.",
  },
  {
    name: "İBB Öğrenci Bursu",
    category: "Belediye",
    tutar: "2.000 ₺/ay",
    donem: "Eylül–Ekim",
    url: "https://burs.ibb.gov.tr",
    note: "İstanbul'da öğrenim gören öğrencilere açık. Gelir şartı var.",
  },
  {
    name: "Sancaktepe Belediyesi Bursu",
    category: "Belediye",
    tutar: "1.000 ₺/ay",
    donem: "Eylül–Kasım",
    url: "https://www.sancaktepe.bel.tr",
    note: "Sancaktepe'de ikamet eden veya okuyan öğrencilere öncelik verilir.",
  },
  {
    name: "Türkiye Eğitim Vakfı (TEV)",
    category: "Vakıf",
    tutar: "2.500 ₺/ay",
    donem: "Mart–Mayıs",
    url: "https://www.tev.org.tr",
    note: "Akademik başarı ve maddi ihtiyaç kriterleri uygulanır.",
  },
  {
    name: "Vehbi Koç Vakfı Bursu",
    category: "Vakıf",
    tutar: "3.000 ₺/ay",
    donem: "Mart–Nisan",
    url: "https://www.vkv.org.tr/burs",
    note: "Oldukça rekabetçi. Erken başvur.",
  },
  {
    name: "Medipol Üniversitesi Burs ve İndirim",
    category: "Özel",
    tutar: "%25–%100 eğitim indirimi",
    donem: "Kayıt döneminde",
    url: "https://www.medipol.edu.tr/burs",
    note: "Başarı bursu, kardeş indirimi ve ihtiyaç bursu seçenekleri mevcut. Burs ofisini ziyaret et.",
  },
];

const filters: Filter[] = ["Tümü", "Devlet", "Belediye", "Vakıf", "Özel"];

const categoryBadgeClass: Record<Category, string> = {
  Devlet: "bg-brand text-brand-foreground border-transparent",
  Belediye: "bg-purple-500 text-white border-transparent",
  Vakıf: "bg-warning text-warning-foreground border-transparent",
  Özel: "bg-muted text-muted-foreground border-transparent",
};

export function BurslarTab() {
  const [filter, setFilter] = useState<Filter>("Tümü");

  const visible = filter === "Tümü" ? burslar : burslar.filter((b) => b.category === filter);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Öğrenci Bursları</h2>
        <p className="text-sm text-muted-foreground">
          Başvurabileceğin tüm burs kaynakları
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {visible.map((b) => (
          <Card key={b.name} className="space-y-2.5 p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-bold leading-tight">{b.name}</p>
              <Badge className={`shrink-0 text-[10px] ${categoryBadgeClass[b.category]}`}>
                {b.category}
              </Badge>
            </div>

            <p className="text-lg font-bold text-success">{b.tutar}</p>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{b.donem}</span>
            </div>

            {b.note && (
              <div className="flex gap-1.5 rounded-md border border-warning/30 bg-warning-soft p-2">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-warning" />
                <p className="text-[11px] leading-snug text-foreground">{b.note}</p>
              </div>
            )}

            <Button
              asChild
              size="sm"
              className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
            >
              <a href={b.url} target="_blank" rel="noopener noreferrer">
                Başvur <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </a>
            </Button>
          </Card>
        ))}
      </div>

      <Alert className="border-border bg-muted">
        <Info className="h-4 w-4 text-muted-foreground" />
        <AlertDescription className="text-foreground">
          Burs tutarları ve başvuru tarihleri her yıl değişebilir. Başvurmadan önce resmi
          kaynakları kontrol edin.
        </AlertDescription>
      </Alert>
    </div>
  );
}
