import {
  Bus,
  Wallet,
  Heart,
  ShoppingBag,
  GraduationCap,
  BookOpen,
  ClipboardList,
  ChevronDown,
  Accessibility,
  type LucideIcon,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import type { ModuleId } from "@/lib/modules";
import { PahalikGostergesi } from "@/components/ui/PahalikGostergesi";
import { ErişilebilirlikTab } from "@/components/tabs/EtkinliklerTab";

type Module = {
  id: ModuleId;
  label: string;
  Icon: LucideIcon;
  bg: string;
  color: string;
};

const MODULES: Module[] = [
  { id: "ulasim", label: "Ulaşım", Icon: Bus, bg: "#EFF6FF", color: "#2563EB" },
  { id: "butce", label: "Bütçe", Icon: Wallet, bg: "#F0FDF4", color: "#16A34A" },
  { id: "saglik", label: "Sağlık", Icon: Heart, bg: "#FFF1F2", color: "#E11D48" },
  { id: "ihtiyaclar", label: "İhtiyaçlar", Icon: ShoppingBag, bg: "#FFFBEB", color: "#D97706" },
  { id: "burslar", label: "Burslar", Icon: GraduationCap, bg: "#FAF5FF", color: "#7C3AED" },
  { id: "gelisim", label: "Gelişim", Icon: BookOpen, bg: "#F0FDFA", color: "#0D9488" },
  { id: "ilkhafta", label: "İlk Hafta", Icon: ClipboardList, bg: "#FFF7ED", color: "#EA580C" },
  { id: "erisilebilirlik", label: "Erişilebilirlik", Icon: Accessibility, bg: "#EFF6FF", color: "#2563EB" },
];

type Props = {
  onOpenModule: (id: ModuleId) => void;
  onOpenSchool: () => void;
  onOpenDistrict: () => void;
};

export function MenuScreen({ onOpenModule, onOpenSchool, onOpenDistrict }: Props) {
  const { selectedSchool, selectedDistrict } = useAppContext();
  const schoolShort = selectedSchool.includes("Medipol") ? "Medipol" : selectedSchool;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
        <h2 className="text-[22px] font-bold tracking-tight text-black">Merhaba 👋</h2>
        <p className="mt-1 text-[15px] text-[#6B7280]">
          {schoolShort} × {selectedDistrict} rehberin hazır
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            onClick={onOpenSchool}
            className="inline-flex items-center gap-1 rounded-full bg-[#2563EB] px-2.5 py-1 text-xs font-semibold text-white transition-opacity active:opacity-80"
          >
            {schoolShort}
            <ChevronDown className="h-3 w-3" />
          </button>
          <button
            onClick={onOpenDistrict}
            className="inline-flex items-center gap-1 rounded-full bg-[#16A34A] px-2.5 py-1 text-xs font-semibold text-white transition-opacity active:opacity-80"
          >
            {selectedDistrict}
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      <section>
        <h3 className="mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.05em] text-[#6B7280]">
          Modüller
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {MODULES.map(({ id, label, Icon, bg, color }) => (
            <button
              key={id}
              onClick={() => onOpenModule(id)}
              className="group flex aspect-square flex-col items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-sm transition-transform active:scale-[0.97]"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: bg }}
              >
                <Icon size={28} color={color} strokeWidth={2.2} />
              </div>
              <span className="mt-3 text-[13px] font-medium text-[#111827]">{label}</span>
            </button>
          ))}
        </div>
      </section>

      <ErişilebilirlikTab />

      <section>
        <h3 className="mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.05em] text-[#6B7280]">
          İlçe Pahalılık Göstergesi
        </h3>
        <PahalikGostergesi />
      </section>
    </div>
  );
}