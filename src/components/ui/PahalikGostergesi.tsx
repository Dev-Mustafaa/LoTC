import { useEffect, useState } from "react";

interface CategoryData {
  name: string;
  score: number;
}

interface DistrictData {
  name: string;
  score: number;
  isCurrent?: boolean;
}

const CATEGORIES: CategoryData[] = [
  { name: "Kira", score: 5 },
  { name: "Ulaşım", score: 7 },
  { name: "Market & Gıda", score: 5 },
  { name: "Dışarıda Yemek", score: 6 },
  { name: "Genel Yaşam", score: 6 },
];

const DISTRICTS: DistrictData[] = [
  { name: "Sultanbeyli", score: 4.8 },
  { name: "Pendik", score: 5.5 },
  { name: "Kartal", score: 5.8 },
  { name: "Sancaktepe", score: 6.2, isCurrent: true },
  { name: "Ümraniye", score: 7.1 },
  { name: "Kadıköy", score: 8.4 },
  { name: "Beşiktaş", score: 9.6 },
];

function getScoreColor(score: number): string {
  if (score <= 4) return "#16A34A"; // green
  if (score <= 6) return "#D97706"; // amber
  return "#DC2626"; // red
}

function AnimatedBar({ 
  percentage, 
  color, 
  height = "6px", 
  className = "" 
}: { 
  percentage: number; 
  color: string; 
  height?: string; 
  className?: string;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div 
      className={`bg-gray-200 rounded-full ${className}`}
      style={{ height }}
    >
      <div
        className="h-full rounded-full transition-all duration-600 ease-out"
        style={{ 
          width: `${width}%`,
          backgroundColor: color,
          transitionDuration: "600ms"
        }}
      />
    </div>
  );
}

export function PahalikGostergesi() {
  const overallScore = 6.2;
  const overallPercentage = 62;

  return (
    <div className="space-y-5">
      {/* Part 1 — Overall Score Card */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-[28px] font-bold" style={{ color: "#D97706" }}>
              {overallScore} / 10
            </div>
            <div className="mt-1 text-[12px] text-[#6B7280]">Pahalılık Skoru</div>
            <div className="mt-2 inline-flex items-center rounded-full bg-green-100 px-2 py-1">
              <span className="text-[11px] font-medium text-green-800">
                ✓ Öğrenci Dostu İlçe
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="relative h-20 w-2 bg-gray-200 rounded-full">
              <div
                className="absolute bottom-0 w-full rounded-full transition-all duration-600 ease-out"
                style={{
                  height: `${overallPercentage}%`,
                  backgroundColor: "#D97706",
                  transitionDuration: "600ms"
                }}
              />
              <div
                className="absolute w-3 h-3 bg-amber-600 rounded-full border-2 border-white"
                style={{
                  bottom: `${overallPercentage}%`,
                  left: "50%",
                  transform: "translateX(-50%) translateY(50%)"
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-3 text-[11px] text-[#6B7280]">
          10 = İstanbul'un en pahalı ilçesi (Beşiktaş, Sarıyer)
        </div>
      </div>

      {/* Part 2 — Category Breakdown */}
      <div className="space-y-3">
        {CATEGORIES.map((category) => (
          <div key={category.name} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#111827]">{category.name}</span>
              <span 
                className="text-[14px] font-medium"
                style={{ color: getScoreColor(category.score) }}
              >
                {category.score}/10
              </span>
            </div>
            <AnimatedBar
              percentage={category.score * 10}
              color={getScoreColor(category.score)}
            />
          </div>
        ))}
      </div>

      {/* Part 3 — District Comparison */}
      <div className="space-y-3">
        <div className="text-[13px] font-medium text-[#111827]">
          İstanbul İlçe Karşılaştırması
        </div>
        <div className="text-[11px] text-[#6B7280]">
          Öğrenciler için genel yaşam maliyeti (düşük = ucuz)
        </div>
        <div className="space-y-2">
          {DISTRICTS.map((district) => (
            <div 
              key={district.name}
              className={`flex items-center gap-2 ${district.isCurrent ? 'bg-amber-50 -mx-2 px-2 py-1 rounded-lg border-l-3' : ''}`}
              style={district.isCurrent ? { 
                borderLeftColor: "#D97706", 
                borderLeftWidth: "3px",
                backgroundColor: "#FFFBEB"
              } : {}}
            >
              <div 
                className="text-[13px] font-medium"
                style={{ 
                  width: "110px",
                  fontWeight: district.isCurrent ? 600 : 400
                }}
              >
                {district.name}
              </div>
              <div className="flex-1 flex items-center gap-2">
                <AnimatedBar
                  percentage={district.score * 10}
                  color={getScoreColor(district.score)}
                  height="10px"
                  className="flex-1"
                />
                <span 
                  className="text-[12px] font-medium"
                  style={{ color: getScoreColor(district.score) }}
                >
                  {district.score}
                </span>
              </div>
            </div>
          ))}
          {DISTRICTS.filter(d => d.isCurrent).map(district => (
            <div key={district.name} className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-lg" style={{ backgroundColor: '#FFFBEB' }}>
                <span 
                  className="text-[13px] font-medium"
                  style={{ color: getScoreColor(district.score) }}
                >
                  {district.name}
                </span>
                <span 
                  className="text-[12px] font-medium"
                  style={{ color: getScoreColor(district.score) }}
                >
                  {district.score}
                </span>
              </div>
              <div className="text-[11px] text-amber-600 font-medium">
                Sen buradasın 📍
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 4 — Student Summary Card */}
      <div 
        className="rounded-2xl p-4"
        style={{ 
          backgroundColor: "#F0FDF4",
          borderColor: "#BBF7D0",
          borderWidth: "0.5px"
        }}
      >
        <div 
          className="text-[15px] font-semibold mb-3"
          style={{ color: "#16A34A" }}
        >
          Sancaktepe Neden Mantıklı?
        </div>
        <div className="space-y-2">
          {[
            "KYK yurdu ile kira maliyeti minimumda (1.500 ₺)",
            "Market fiyatları İstanbul ortalamasının altında",
            "Kent Lokantası ile günlük yemek ~20 ₺",
            "19S hattı ile gece ulaşımı güvende",
            "Sancaktepe Belediyesi öğrenci bursu mevcut"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <span style={{ color: "#16A34A" }}>✓</span>
              <span className="text-[13px] text-[#374151]">{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-[11px] text-[#6B7280] italic">
          * Veriler 2025 yılı öğrenci harcama analizine dayanmaktadır.
        </div>
      </div>
    </div>
  );
}
