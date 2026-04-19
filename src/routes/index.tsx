import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Map as MapIcon,
  Grid2x2,
  ChevronDown,
  ChevronLeft,
  Check,
  Lock,
  Search,
  X,
} from "lucide-react";
import { FloatingChat } from "@/components/FloatingChat";
import { HaritaTab } from "@/components/tabs/HaritaTab";
import { UlasimTab } from "@/components/tabs/UlasimTab";
import { ButceTab } from "@/components/tabs/ButceTab";
import { SaglikTab } from "@/components/tabs/SaglikTab";
import { IhtiyaclarTab } from "@/components/tabs/IhtiyaclarTab";
import { BurslarTab } from "@/components/tabs/BurslarTab";
import { GelisimTab } from "@/components/tabs/GelisimTab";
import { IlkHaftaTab } from "@/components/tabs/IlkHaftaTab";
import { ErişilebilirlikTab } from "@/components/tabs/EtkinliklerTab";
import { MenuScreen } from "@/components/screens/MenuScreen";
import { useAppContext } from "@/context/AppContext";
import { MODULE_TITLES, type ModuleId } from "@/lib/modules";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "İstanbul Öğrenci Rehberi" },
      {
        name: "description",
        content:
          "Birinci sınıf üniversite öğrencileri için İstanbul'da yaşam, ulaşım, bütçe ve sağlık rehberi.",
      },
    ],
  }),
  component: Index,
});

type TabId = "harita" | "menu";

const TABS: { id: TabId; label: string; Icon: typeof MapIcon }[] = [
  { id: "harita", label: "Harita", Icon: MapIcon },
  { id: "menu", label: "Menü", Icon: Grid2x2 },
];

const SCHOOL_OPTIONS = [
  { value: "Medipol Üniversitesi", label: "Medipol Üniversitesi (Kavacık)", available: true },
  { value: "İstanbul Üniversitesi", label: "İstanbul Üniversitesi (Beyazıt)", available: false },
  { value: "Marmara Üniversitesi", label: "Marmara Üniversitesi (Göztepe)", available: false },
  { value: "Yıldız Teknik Üniversitesi", label: "Yıldız Teknik Üniversitesi (Beşiktaş)", available: false },
  { value: "Boğaziçi Üniversitesi", label: "Boğaziçi Üniversitesi (Bebek)", available: false },
];

const DISTRICT_OPTIONS = [
  { value: "Sancaktepe", label: "Sancaktepe", available: true },
  { value: "Kadıköy", label: "Kadıköy", available: false },
  { value: "Üsküdar", label: "Üsküdar", available: false },
  { value: "Ümraniye", label: "Ümraniye", available: false },
  { value: "Pendik", label: "Pendik", available: false },
];

function renderModule(id: ModuleId) {
  switch (id) {
    case "ulasim": return <UlasimTab />;
    case "butce": return <ButceTab />;
    case "saglik": return <SaglikTab />;
    case "ihtiyaclar": return <IhtiyaclarTab />;
    case "burslar": return <BurslarTab />;
    case "gelisim": return <GelisimTab />;
    case "ilkhafta": return <IlkHaftaTab />;
    case "erisilebilirlik": return <ErişilebilirlikTab />;
  }
}

function Index() {
  const [active, setActive] = useState<TabId>("menu");
  const [subPage, setSubPage] = useState<ModuleId | null>(null);
  const [schoolOpen, setSchoolOpen] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [schoolSearch, setSchoolSearch] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");

  const { selectedSchool, selectedDistrict, setSelectedSchool, setSelectedDistrict } =
    useAppContext();

  const schoolShort = selectedSchool.includes("Medipol") ? "Medipol" : selectedSchool;
  const inSubPage = active === "menu" && subPage !== null;

  const switchTab = (id: TabId) => {
    setActive(id);
    setSubPage(null);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <div className="mx-auto flex min-h-screen max-w-[480px] flex-col bg-white">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white/95 backdrop-blur">
          <div className={`flex h-12 items-center px-4 ${inSubPage ? "justify-between" : "justify-center"}`}>
            {inSubPage ? (
              <>
                <button
                  onClick={() => setSubPage(null)}
                  className="-ml-1 inline-flex items-center text-[15px] text-[#2563EB] active:opacity-70"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Menü
                </button>
                <h1 className="text-[17px] font-semibold text-black">
                  {subPage ? MODULE_TITLES[subPage] : ""}
                </h1>
                <span className="w-12" />
              </>
            ) : (
              <>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setSchoolOpen(true)}
                    className="inline-flex items-center gap-1 rounded-full bg-[#2563EB] px-2.5 py-1 text-xs font-semibold text-white active:opacity-80"
                  >
                    {schoolShort}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => setDistrictOpen(true)}
                    className="inline-flex items-center gap-1 rounded-full bg-[#16A34A] px-2.5 py-1 text-xs font-semibold text-white active:opacity-80"
                  >
                    {selectedDistrict}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Content */}
        <main className={`relative flex-1 overflow-hidden px-4 pb-24 ${active === "harita" ? "pt-0" : "pt-4"}`}>
          {active === "harita" && <HaritaTab />}
          {active === "menu" && (
            <>
              <div
                className={`transition-transform duration-200 ${
                  inSubPage ? "pointer-events-none -translate-x-6 opacity-0" : "translate-x-0 opacity-100"
                }`}
              >
                <MenuScreen
                  onOpenModule={(id) => setSubPage(id)}
                  onOpenSchool={() => setSchoolOpen(true)}
                  onOpenDistrict={() => setDistrictOpen(true)}
                />
              </div>

              {inSubPage && subPage && (
                <div
                  key={subPage}
                  className="absolute inset-0 overflow-y-auto bg-white px-4 pb-24 pt-4 animate-in slide-in-from-right duration-[250ms] ease-out"
                >
                  {renderModule(subPage)}
                </div>
              )}
            </>
          )}
        </main>

        {/* Bottom tabs */}
        <FloatingChat />

        <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-[#E5E7EB] bg-white/95 backdrop-blur">
          <div className="grid grid-cols-2">
            {TABS.map(({ id, label, Icon }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => switchTab(id)}
                  className="flex flex-col items-center gap-1 py-2.5"
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: isActive ? "#2563EB" : "#9CA3AF" }}
                    strokeWidth={isActive ? 2.4 : 2}
                  />
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: isActive ? "#2563EB" : "#9CA3AF" }}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* School selector modal */}
      {schoolOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/50"
          onClick={() => {
            setSchoolOpen(false);
            setSchoolSearch("");
          }}
        >
          <div 
            className="fixed bottom-0 left-0 right-0 mx-auto max-w-[480px] max-h-[70vh] overflow-hidden rounded-t-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-[#E5E7EB]" />
            <div className="flex items-center justify-between px-4 pb-2 pt-3">
              <h2 className="text-[17px] font-semibold">Üniversiteni Seç</h2>
              <button
                onClick={() => {
                  setSchoolOpen(false);
                  setSchoolSearch("");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Üniversite ara..."
                  value={schoolSearch}
                  onChange={(e) => setSchoolSearch(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E7EB] bg-white pl-10 pr-4 py-3 text-[15px] placeholder-[#9CA3AF] focus:border-[#2563EB] focus:outline-none"
                />
              </div>
            </div>
            <div className="divide-y divide-[#E5E7EB] overflow-y-auto pb-4">
              {SCHOOL_OPTIONS
                .filter((opt) => opt.label.toLowerCase().includes(schoolSearch.toLowerCase()))
                .map((opt) => {
                  const isSelected = opt.available && selectedSchool === opt.value;
                  return (
                    <button
                      key={opt.label}
                      disabled={!opt.available}
                      onClick={() => {
                        if (!opt.available) return;
                        setSelectedSchool(opt.value);
                        setSchoolOpen(false);
                        setSchoolSearch("");
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-4 text-left ${
                        opt.available ? "active:bg-[#F2F2F7]" : "cursor-not-allowed opacity-60"
                      }`}
                    >
                      <span
                        className={`flex-1 text-[15px] font-medium ${
                          isSelected ? "text-[#2563EB]" : "text-black"
                        }`}
                      >
                        {opt.label}
                      </span>
                      {opt.available
                        ? isSelected && <Check className="h-5 w-5 text-[#2563EB]" />
                        : <Lock className="h-4 w-4 text-[#9CA3AF]" />}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* District selector modal */}
      {districtOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/50"
          onClick={() => {
            setDistrictOpen(false);
            setDistrictSearch("");
          }}
        >
          <div 
            className="fixed bottom-0 left-0 right-0 mx-auto max-w-[480px] max-h-[70vh] overflow-hidden rounded-t-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-[#E5E7EB]" />
            <div className="flex items-center justify-between px-4 pb-2 pt-3">
              <h2 className="text-[17px] font-semibold">İlçeni Seç</h2>
              <button
                onClick={() => {
                  setDistrictOpen(false);
                  setDistrictSearch("");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="İlçe ara..."
                  value={districtSearch}
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E7EB] bg-white pl-10 pr-4 py-3 text-[15px] placeholder-[#9CA3AF] focus:border-[#16A34A] focus:outline-none"
                />
              </div>
            </div>
            <div className="divide-y divide-[#E5E7EB] overflow-y-auto pb-4">
              {DISTRICT_OPTIONS
                .filter((opt) => opt.label.toLowerCase().includes(districtSearch.toLowerCase()))
                .map((opt) => {
                  const isSelected = opt.available && selectedDistrict === opt.value;
                  return (
                    <button
                      key={opt.label}
                      disabled={!opt.available}
                      onClick={() => {
                        if (!opt.available) return;
                        setSelectedDistrict(opt.value);
                        setDistrictOpen(false);
                        setDistrictSearch("");
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-4 text-left ${
                        opt.available ? "active:bg-[#F2F2F7]" : "cursor-not-allowed opacity-60"
                      }`}
                    >
                      <span
                        className={`flex-1 text-[15px] font-medium ${
                          isSelected ? "text-[#16A34A]" : "text-black"
                        }`}
                      >
                        {opt.label}
                      </span>
                      {opt.available
                        ? isSelected && <Check className="h-5 w-5 text-[#16A34A]" />
                        : <Lock className="h-4 w-4 text-[#9CA3AF]" />}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
