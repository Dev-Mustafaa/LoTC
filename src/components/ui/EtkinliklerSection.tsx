import { useState } from "react";

const EVENTS = [
  {
    id: 1,
    category: 'sinema',
    emoji: 'ð',
    color: '#EFF6FF',
    name: 'Çarşamba Sinema İndirimi',
    location: 'Tüm Cinemaximum & Cineplex',
    datetime: 'Her Çarşamba',
    price: '40-60 ₺',
    isPriced: true,
    note: 'Öğrenci kartıyla her Çarşamba indirimli'
  },
  {
    id: 2,
    category: 'kultur',
    emoji: 'ð',
    color: '#FDF4FF',
    name: 'İBB Şehir Tiyatroları',
    location: 'Çeşitli Sahneler',
    datetime: 'Hafta içi & sonu',
    price: 'Ücretsiz',
    isPriced: false,
    note: 'Öğrenci kimliğiyle ücretsiz veya indirimli'
  },
  {
    id: 3,
    category: 'kultur',
    emoji: 'ð',
    color: '#FFF7ED',
    name: 'İBB Sanat Galerileri',
    location: 'Tüm İBB Galerileri',
    datetime: 'Salı–Pazar 10:00–18:00',
    price: 'Ücretsiz',
    isPriced: false,
    note: 'Sürekli değişen sergi programı'
  },
  {
    id: 4,
    category: 'egitim',
    emoji: 'ð',
    color: '#F0FDF4',
    name: 'İSMEK Ücretsiz Kurslar',
    location: 'İSMEK Sancaktepe',
    datetime: 'Kayıt: Eylül & Şubat',
    price: 'Ücretsiz',
    isPriced: false,
    note: 'Dil, müzik, grafik tasarım ve daha fazlası'
  },
  {
    id: 5,
    category: 'acik-hava',
    emoji: 'ð',
    color: '#F0FDF4',
    name: 'Sancaktepe Pazar',
    location: 'Sancaktepe Meydanı',
    datetime: 'Her Pazar 07:00–14:00',
    price: 'Ücretsiz giriş',
    isPriced: false,
    note: 'Taze sebze meyve, yerel ürünler'
  },
  {
    id: 6,
    category: 'sinema',
    emoji: 'ð¥',
    color: '#EFF6FF',
    name: 'Açık Hava Sineması',
    location: 'İBB Parkları',
    datetime: 'Yaz ayları, Cuma–Pazar',
    price: 'Ücretsiz',
    isPriced: false,
    note: 'İBB tarafından düzenlenir, programa göre değişir'
  },
  {
    id: 7,
    category: 'kultur',
    emoji: 'ðµ',
    color: '#FDF4FF',
    name: 'İBB Konserler',
    location: 'Çeşitli Mekanlar',
    datetime: 'Haftalık program',
    price: 'Ücretsiz',
    isPriced: false,
    note: 'CRR ve İBB orkestrası ücretsiz konserler'
  },
  {
    id: 8,
    category: 'acik-hava',
    emoji: 'ð',
    color: '#F0FDFA',
    name: 'Sancaktepe Koşu Parkuru',
    location: 'Sancaktepe Millet Bahçesi',
    datetime: 'Her gün 06:00–22:00',
    price: 'Ücretsiz',
    isPriced: false,
    note: 'Açık spor alanları ve koşu pistleri'
  }
];

const FILTERS = [
  { id: 'tumu', label: 'Tümü', emoji: '' },
  { id: 'sinema', label: 'Sinema', emoji: 'ð¬' },
  { id: 'kultur', label: 'Kültür', emoji: 'ð' },
  { id: 'egitim', label: 'Eğitim', emoji: 'ð' },
  { id: 'acik-hava', label: 'Açık Hava', emoji: 'ð¿' },
];

type FilterType = typeof FILTERS[number]['id'];

export function EtkinliklerSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('tumu');

  const filteredEvents = activeFilter === 'tumu' 
    ? EVENTS 
    : EVENTS.filter(event => event.category === activeFilter);

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-[16px] font-bold text-black">Bu Hafta Sancaktepe'de</h3>
        <p className="text-[13px] text-[#6B7280]">Ücretsiz & uygun fiyat etkinlikler</p>
      </div>

      {/* Filter Row */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.emoji} {filter.label}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="flex-shrink-0 w-[200px] rounded-xl border border-[#E5E7EB] overflow-hidden"
          >
            {/* Colored Banner */}
            <div
              className="h-[60px] flex items-center justify-center rounded-t-xl"
              style={{ backgroundColor: event.color }}
            >
              <span className="text-[28px]">{event.emoji}</span>
            </div>
            
            {/* Card Body */}
            <div className="bg-white rounded-b-xl p-3">
              <h4 className="text-[14px] font-bold text-black line-clamp-2 mb-2">
                {event.name}
              </h4>
              
              <div className="space-y-1">
                <div className="text-[12px] text-[#6B7280] flex items-center gap-1">
                  <span>ð</span>
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                
                <div className="text-[12px] text-[#2563EB]">
                  {event.datetime}
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      event.isPriced
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {event.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-[12px] text-blue-700">
          ð Etkinlik programlar deitebilir. Ä°BB'nin resmi kanallar takip edin: @istanbulbuyuksehir
        </p>
      </div>
    </section>
  );
}
