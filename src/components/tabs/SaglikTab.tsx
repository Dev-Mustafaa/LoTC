import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Hospital, User, Cross, Info, ArrowRight } from "lucide-react";

type Place = {
  name: string;
  type: string;
  distance: string;
  open24: boolean;
  icon: "hospital" | "user" | "cross";
  url: string;
};

const places: Place[] = [
  {
    name: "Sancaktepe Eğitim ve Araştırma Hastanesi",
    type: "Acil Servis",
    distance: "2.1 km",
    open24: true,
    icon: "hospital",
    url: "https://maps.google.com/?q=Sancaktepe+Egitim+Arastirma+Hastanesi+Istanbul",
  },
  {
    name: "Sancaktepe Aile Sağlığı Merkezi",
    type: "Aile Hekimi",
    distance: "0.8 km",
    open24: false,
    icon: "user",
    url: "https://maps.google.com/?q=Sancaktepe+Aile+Sagligi+Merkezi",
  },
  {
    name: "Eczane Güneş",
    type: "Eczane",
    distance: "0.4 km",
    open24: true,
    icon: "cross",
    url: "https://maps.google.com/?q=Eczane+Sancaktepe",
  },
];

const iconMap = {
  hospital: { Icon: Hospital, bg: "bg-danger-soft", color: "text-danger" },
  user: { Icon: User, bg: "bg-brand-soft", color: "text-brand" },
  cross: { Icon: Cross, bg: "bg-success-soft", color: "text-success" },
};

export function SaglikTab() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">En Yakın Sağlık Noktaları</h2>
        <p className="text-sm text-muted-foreground">
          Mahmut Ökten Yurdu'na yakınlık sırasına göre
        </p>
      </div>

      <div className="space-y-3">
        {places.map((p) => {
          const { Icon, bg, color } = iconMap[p.icon];
          return (
            <Card key={p.name} className="p-4">
              <div className="flex gap-3">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${bg}`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className="text-sm font-semibold leading-tight">{p.name}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{p.type}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="font-medium">{p.distance}</span>
                    {p.open24 && (
                      <Badge className="bg-success text-success-foreground border-transparent">
                        24 saat açık
                      </Badge>
                    )}
                  </div>
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

      <Alert className="border-brand/30 bg-brand-soft">
        <Info className="h-4 w-4 text-brand" />
        <AlertDescription className="text-foreground">
          Medipol Üniversitesi'nin kendi hastanesi bulunmaktadır. Öğrenci sağlık sigortanızı
          kayıt sırasında aktive etmeyi unutmayın.
        </AlertDescription>
      </Alert>
    </div>
  );
}
