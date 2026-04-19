import {
  Users,
  Accessibility,
  ArrowUpDown,
  CheckCircle,
  Eye,
  Hand,
  Home,
  Bus,
  MapPin,
  CreditCard,
  Droplets,
  Hospital,
  Heart,
  Cross,
  Car,
  ChevronRight,
  Phone,
  ExternalLink,
} from "lucide-react";

export function ErişilebilirlikTab() {
  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div>
        <h2 className="text-xl font-bold text-black">Erişilebilirlik Rehberi</h2>
        <p className="text-sm text-[#6B7280]">Engelli öğrenciler için Sancaktepe & Medipol</p>
      </div>

      {/* Blue Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-700">
          Bu rehber görme, işitme, fiziksel ve öğrenme güçlüğü yaşayan öğrenciler için hazırlanmıştır.
        </p>
      </div>

      {/* Section 1: Medipol Kampüsü Erişilebilirlik */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black mb-3">Medipol Kampüsü Erişilebilirlik</h3>
        
        <div className="space-y-3">
          {/* Engelli Öğrenci Birimi */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Engelli Öğrenci Birimi</h4>
                <p className="text-sm text-[#6B7280]">Kayıt ve destek için ilk başvuru noktası</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-blue-600">Kavacık Kampüsü, Zemin Kat</span>
              <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                İletişim →
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tekerlekli Sandalye Erişimi */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                <Accessibility className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Tekerlekli Sandalye Erişimi</h4>
                <p className="text-sm text-[#6B7280]">Tüm ana binalarda rampa ve geniş kapı mevcut</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-green-600">✓ Mevcut</span>
            </div>
          </div>

          {/* Asansörler */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                <ArrowUpDown className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Asansörler</h4>
                <p className="text-sm text-[#6B7280]">A, B, C blokları asansörlü. D blok merdiven</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-blue-600">3/4 Blok</span>
            </div>
          </div>

          {/* Engelli Tuvaleti */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Engelli Tuvaleti</h4>
                <p className="text-sm text-[#6B7280]">Her katta en az 1 engelli tuvaleti</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-green-600">✓ Mevcut</span>
            </div>
          </div>

          {/* Görme Engelli Yönlendirme */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-100">
                <Eye className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Görme Engelli Yönlendirme</h4>
                <p className="text-sm text-[#6B7280]">Ana giriş ve koridorlarda sarı çizgiler mevcut</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-amber-600">Kısmi</span>
            </div>
          </div>

          {/* İşaret Dili Desteği */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100">
                <Hand className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">İşaret Dili Desteği</h4>
                <p className="text-sm text-[#6B7280]">Engelli Öğrenci Birimi'nden randevu ile</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-purple-600">Randevulu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Yurt Erişilebilirlik */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black mb-3">Mahmut Ökten Celaleddin Yurdu</h3>
        
        <div className="space-y-3">
          {/* Zemin Kat Odaları */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                <Home className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Zemin Kat Odaları</h4>
                <p className="text-sm text-[#6B7280]">Engelli öğrenciler için zemin kat odası talep edilebilir</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-green-600">Talep ile</span>
            </div>
          </div>

          {/* Asansör */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                <ArrowUpDown className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Asansör</h4>
                <p className="text-sm text-[#6B7280]">Yurt binasında asansör mevcut</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-green-600">✓ Mevcut</span>
            </div>
          </div>

          {/* Banyo Erişimi */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-100">
                <Droplets className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Banyo Erişimi</h4>
                <p className="text-sm text-[#6B7280]">Engelli banyosu zemin katta</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-amber-600">Zemin Kat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Ulaşım Erişilebilirlik */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black mb-3">Ulaşım Erişilebilirlik</h3>
        
        <div className="space-y-3">
          {/* M4 Metrobüsü */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                <Bus className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">M4 Metrobüsü</h4>
                <p className="text-sm text-[#6B7280]">Tüm metrobüs araçları alçak tabanlı ve tekerlekli sandalye alanı mevcut</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-blue-600">✓ Erişilebilir</span>
            </div>
          </div>

          {/* Sancaktepe Terminal */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Sancaktepe Terminal</h4>
                <p className="text-sm text-[#6B7280]">Terminalde engelli rampası ve öncelikli bekleme alanı var</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-blue-600">✓ Rampa Mevcut</span>
            </div>
          </div>

          {/* Engelli Kartı (IETT) */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Engelli Kartı (IETT)</h4>
                <p className="text-sm text-[#6B7280]">İETT engelli kartı ile toplu taşıma ücretsiz</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-green-600">Ücretsiz</span>
            </div>
          </div>

          {/* Taksi (Engelli) */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-100">
                <Car className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Taksi (Engelli)</h4>
                <p className="text-sm text-[#6B7280]">İstanbul'da engelli dostu taksi hizmeti: 444 1 373</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-amber-600">7/24</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Sağlık & Destek */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black mb-3">Sağlık & Destek</h3>
        
        <div className="space-y-3">
          {/* Sancaktepe Hastanesi — Engelli Girişi */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-100">
                <Hospital className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Sancaktepe Hastanesi — Engelli Girişi</h4>
                <p className="text-sm text-[#6B7280]">Ana girişte tekerlekli sandalye rampa ve asansör mevcut</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-red-600">✓ Erişilebilir</span>
              <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                Yol Tarifi →
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Psikososyal Destek (Medipol) */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Psikososyal Destek (Medipol)</h4>
                <p className="text-sm text-[#6B7280]">Öğrenci Psikolojik Danışmanlık Merkezi — ücretsiz</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-purple-600">Ücretsiz</span>
              <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                Randevu →
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Engelli Eczanesi Hizmeti */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                <Cross className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">Engelli Eczanesi Hizmeti</h4>
                <p className="text-sm text-[#6B7280]">Eczane Güneş eve ilaç teslimati yapabilir (0.4 km)</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium text-green-600">Eve Teslimat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Faydalı Linkler & Haklar */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black mb-3">Faydalı Linkler & Haklar</h3>
        
        <div className="space-y-3">
          {[
            {
              title: "KYK Engelli Öğrenci Bursu",
              url: "https://burs.yurtlar.gov.tr",
              icon: "₺"
            },
            {
              title: "YÖK Engelli Öğrenci Hakları",
              url: "https://www.yok.gov.tr",
              icon: "📜"
            },
            {
              title: "İBB Engelli Hizmetleri",
              url: "https://www.ibb.istanbul/Hizmetler/Engelliler",
              icon: "🏛️"
            },
            {
              title: "Medipol Engelli Öğrenci Birimi",
              url: "https://www.medipol.edu.tr",
              icon: "🎓"
            }
          ].map((item, index) => (
            <button
              key={index}
              className="w-full bg-white rounded-xl border border-[#E5E7EB] p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => window.open(item.url, '_blank')}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-black text-left">{item.title}</span>
                <span className="text-lg">{item.icon}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Info Box */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-purple-700">
          Haklarını bilmek en güçlü adımdır. Herhangi bir konuda destek almak isterseniz Yapay Zeka sekmesinden bana sorabilirsin.
        </p>
      </div>
    </div>
  );
}
