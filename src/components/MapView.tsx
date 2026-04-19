import { useEffect, useState, useRef } from "react";

const dorm: [number, number] = [40.9833, 29.2333]; // Mahmut Ökten Celaleddin Yurdu
const uni: [number, number] = [41.088305064846935, 29.08872394722807]; // Medipol Kavacık Kampüsü - Gerçek Koordinat

// Yurtlar Verisi - KYK ve Özel
export type DormType = 'kyk' | 'ozel';
export type DormGender = 'erkek' | 'kiz';

export interface Dorm {
  id: string;
  name: string;
  type: DormType;
  gender: DormGender;
  coords: [number, number];
  emoji: string;
  color: string;
  priceRange: string;
  mealIncluded: boolean;
  capacity: number;
  phone?: string;
  rating: number;
  reviewCount: number;
  reviews: {
    author: string;
    rating: number;
    comment: string;
    date: string;
    roomType?: string;
    pricePaid?: string;
  }[];
  facilities: string[];
  distanceToUni: string;
  transport: {
    type: string;
    transfers: number;
    duration: string;
    details: string;
  };
  exchangeRequests?: {
    id: string;
    name: string;
    currentDorm: string;
    targetSchool: string;
    date: string;
  }[];
}

const dorms: Dorm[] = [
  {
    id: 'mahmut-celaleddin',
    name: 'Mahmut Ökten Celaleddin Erkek Öğrenci Yurdu',
    type: 'kyk',
    gender: 'erkek',
    coords: [41.003518871394256, 29.229859337204942],
    emoji: '🏛️',
    color: '#DC2626',
    priceRange: '1.200 ₺',
    mealIncluded: true,
    capacity: 320,
    phone: '0216 529 70 70',
    rating: 3.8,
    reviewCount: 156,
    distanceToUni: '3.5 km',
    transport: { type: 'Otobüs', transfers: 1, duration: '35-45 dk', details: '622 ile Kavacık Köprüsü → Üniversite' },
    facilities: ['Kahvaltı', 'Akşam Yemeği', 'Çamaşırhane', 'Ortak Buzdolabı', 'Çalışma Salonu', 'Spor Salonu'],
    reviews: [
      { author: 'Ahmet K.', rating: 4, comment: 'Yemekler güzel ama odalar biraz eski. Genel olarak memnunum.', date: '2024-03-15', roomType: '3 Kişilik', pricePaid: '1.200 ₺' },
      { author: 'Mehmet Y.', rating: 3, comment: 'İnternet bazen kopuyor. Lokasyon iyi, personel ilgili.', date: '2024-02-20', roomType: '4 Kişilik', pricePaid: '1.200 ₺' },
      { author: 'Burak T.', rating: 4, comment: 'KYK arasında en iyilerden. Sancaktepe merkeze yakın.', date: '2024-01-10', roomType: '3 Kişilik', pricePaid: '1.200 ₺' },
    ],
    exchangeRequests: [
      { id: '1', name: 'Ahmet Yılmaz', currentDorm: 'Mahmut Ökten Celaleddin', targetSchool: 'Mimar Sinan Güzel Sanatlar', date: '2024-04-15' },
      { id: '2', name: 'Mehmet Kaya', currentDorm: 'Mahmut Ökten Celaleddin', targetSchool: 'Haydar Aliyev Erkek Yurdu', date: '2024-04-12' },
      { id: '3', name: 'Burak Demir', currentDorm: 'Mahmut Ökten Celaleddin', targetSchool: 'İTÜ Ayazağa', date: '2024-04-10' },
      { id: '4', name: 'Can Özdemir', currentDorm: 'Mahmut Ökten Celaleddin', targetSchool: 'Yıldız Teknik Davutpaşa', date: '2024-04-08' },
      { id: '5', name: 'Emre Şahin', currentDorm: 'Mahmut Ökten Celaleddin', targetSchool: 'Marmara Üniversitesi Göztepe', date: '2024-04-05' },
      { id: '6', name: 'Kerem Yıldız', currentDorm: 'Mahmut Ökten Celaleddin', targetSchool: 'Haydar Aliyev Erkek Yurdu', date: '2024-04-03' },
    ]
  },
  {
    id: 'haydar-aliyev',
    name: 'Haydar Aliyev Erkek Öğrenci Yurdu',
    type: 'kyk',
    gender: 'erkek',
    coords: [40.96267848704862, 29.12268904249603],
    emoji: '🏢',
    color: '#DC2626',
    priceRange: '1.200 ₺',
    mealIncluded: true,
    capacity: 280,
    phone: '0216 311 44 55',
    rating: 3.5,
    reviewCount: 89,
    distanceToUni: '5.2 km',
    transport: { type: 'Otobüs + Metro', transfers: 2, duration: '50-60 dk', details: 'Yürüme → M5 Samandıra Merkez → Kavacık (1 aktarma)' },
    facilities: ['Kahvaltı', 'Akşam Yemeği', 'Çamaşırhane', 'Asansör', 'Kantin'],
    reviews: [
      { author: 'Can S.', rating: 4, comment: 'Yeni tadilattan geçti, odalar temiz. Ulaşım biraz zor.', date: '2024-03-01', roomType: '4 Kişilik', pricePaid: '1.200 ₺' },
      { author: 'Oğuzhan M.', rating: 3, comment: 'Fiyat uygun ama kalabalık. Yemek saatleri kısıtlı.', date: '2024-02-15', roomType: '4 Kişilik', pricePaid: '1.200 ₺' },
    ],
    exchangeRequests: [
      { id: '1', name: 'Ali Yılmaz', currentDorm: 'Haydar Aliyev Erkek Yurdu', targetSchool: 'Mahmut Ökten Celaleddin', date: '2024-04-16' },
      { id: '2', name: 'Veli Kaya', currentDorm: 'Haydar Aliyev Erkek Yurdu', targetSchool: 'İstanbul Üniversitesi Beyazıt', date: '2024-04-14' },
      { id: '3', name: 'Hasan Demir', currentDorm: 'Haydar Aliyev Erkek Yurdu', targetSchool: 'Mimar Sinan Güzel Sanatlar', date: '2024-04-11' },
      { id: '4', name: 'Hüseyin Özdemir', currentDorm: 'Haydar Aliyev Erkek Yurdu', targetSchool: 'İTÜ Ayazağa', date: '2024-04-09' },
      { id: '5', name: 'İbrahim Şahin', currentDorm: 'Haydar Aliyev Erkek Yurdu', targetSchool: 'Yıldız Teknik Davutpaşa', date: '2024-04-06' },
    ]
  },
  {
    id: 'mihibat',
    name: 'Mihibat Erkek Öğrenci Yurdu',
    type: 'ozel',
    gender: 'erkek',
    coords: [41.095548790878325, 29.08693648297386],
    emoji: '🏠',
    color: '#2563EB',
    priceRange: '3.000-4.000 ₺',
    mealIncluded: true,
    capacity: 120,
    phone: '0216 323 45 67',
    rating: 4.6,
    reviewCount: 45,
    distanceToUni: '400 m',
    transport: { type: 'Yürüme', transfers: 0, duration: '5 dk', details: 'Kampüse yürüme mesafesinde' },
    facilities: ['Tam Pansiyon (Yemek Dahil)', 'Özel Banyo', 'Wifi', 'TV', 'Buzdolabı', 'Klima', 'Çalışma Odası'],
    reviews: [
      { author: 'Kerem A.', rating: 5, comment: 'Üniversiteye yürüme mesafesinde. Odalar süper lüks!', date: '2024-03-20', roomType: '1 Kişilik', pricePaid: '3.800 ₺' },
      { author: 'Emre B.', rating: 4, comment: 'Fiyat uygun, yemekler güzel. Kahvaltı çeşitleri iyi.', date: '2024-02-28', roomType: '2 Kişilik', pricePaid: '3.200 ₺' },
    ]
  },
  {
    id: 'beykoz-kiz',
    name: 'Beykoz Yüksek Öğrenim Kız Yurdu',
    type: 'ozel',
    gender: 'kiz',
    coords: [41.09690712502786, 29.09886694886838],
    emoji: '🏘️',
    color: '#DC2626',
    priceRange: '1.200 ₺',
    mealIncluded: true,
    capacity: 250,
    phone: '0216 413 20 20',
    rating: 3.9,
    reviewCount: 112,
    distanceToUni: '1.2 km',
    transport: { type: 'Servis', transfers: 0, duration: '10 dk', details: 'Kampüse ücretsiz servis mevcut' },
    facilities: ['Kahvaltı', 'Akşam Yemeği', 'Çamaşırhane', 'Kütüphane', 'Spor Salonu'],
    reviews: [
      { author: 'Zeynep K.', rating: 4, comment: 'Kız yurdu olarak güvenli ve temiz. Personel çok ilgili.', date: '2024-03-10', roomType: '3 Kişilik', pricePaid: '1.200 ₺' },
      { author: 'Ayşe M.', rating: 4, comment: 'Kampüse servis var, çok rahat. Odalar temiz.', date: '2024-02-05', roomType: '2 Kişilik', pricePaid: '1.200 ₺' },
    ]
  },
  {
    id: 'tesa-kiz',
    name: 'Tesa Kız Öğrenci Yurdu',
    type: 'ozel',
    gender: 'kiz',
    coords: [41.08869200891815, 29.08822394328737],
    emoji: '🏡',
    color: '#2563EB',
    priceRange: '3.000-4.000 ₺',
    mealIncluded: true,
    capacity: 80,
    phone: '0216 987 65 43',
    rating: 4.8,
    reviewCount: 67,
    distanceToUni: '200 m',
    transport: { type: 'Yürüme', transfers: 0, duration: '3 dk', details: 'Kampüsün hemen yanında' },
    facilities: ['Tam Pansiyon (Yemek Dahil)', 'Özel Banyo', 'Wifi', 'Klima', 'Eşyalı', 'Güvenlik', 'Kamera'],
    reviews: [
      { author: 'Elif S.', rating: 5, comment: 'Medipol\'e en yakın yurt! Odalar mükemmel, güvenlik üst düzey.', date: '2024-03-25', roomType: '1 Kişilik', pricePaid: '4.000 ₺' },
      { author: 'Selin Y.', rating: 5, comment: 'Tesisler çok iyi, yönetim çok ilgili. Kesinlikle tavsiye!', date: '2024-03-01', roomType: '2 Kişilik', pricePaid: '3.200 ₺' },
      { author: 'Ceren D.', rating: 4, comment: 'Fiyat uygun, konum harika. Yemekler güzel.', date: '2024-02-15', roomType: '1 Kişilik', pricePaid: '3.800 ₺' },
    ]
  },
  {
    id: 'cubuklu-erkek',
    name: 'Çubuklu Yüksek Öğrenim Erkek Yurdu',
    type: 'kyk',
    gender: 'erkek',
    coords: [41.10153772983411, 29.082516008922216],
    emoji: '🏗️',
    color: '#DC2626',
    priceRange: '1.200 ₺',
    mealIncluded: true,
    capacity: 200,
    phone: '0216 332 11 22',
    rating: 3.4,
    reviewCount: 78,
    distanceToUni: '2.1 km',
    transport: { type: 'Otobüs', transfers: 1, duration: '20-25 dk', details: 'Bus 2A ile direkt kampüs yolu' },
    facilities: ['Kahvaltı', 'Akşam Yemeği', 'Çamaşırhane', 'Otopark', 'Kantin'],
    reviews: [
      { author: 'Yusuf K.', rating: 3, comment: 'Kampüse ulaşım var ama kalabalık. Yemekler ortalama.', date: '2024-03-05', roomType: '4 Kişilik', pricePaid: '1.200 ₺' },
      { author: 'Ali R.', rating: 4, comment: 'Fiyat-performans olarak iyi. Beykoz bölgesinde avantajlı.', date: '2024-02-20', roomType: '3 Kişilik', pricePaid: '1.200 ₺' },
    ]
  },
  {
    id: 'etiler',
    name: 'Etiler Yurt',
    type: 'ozel',
    gender: 'erkek',
    coords: [41.08381374527735, 29.03076010212699],
    emoji: '🏨',
    color: '#2563EB',
    priceRange: '3.000-4.000 ₺',
    mealIncluded: false,
    capacity: 150,
    phone: '0212 352 88 99',
    rating: 4.5,
    reviewCount: 134,
    distanceToUni: '7.5 km',
    transport: { type: 'Metro + Otobüs', transfers: 2, duration: '45-55 dk', details: 'M2 Levent → M6 Boğaziçi → Otobüs Kavacık' },
    facilities: ['Yemek Hariç', 'Havuz', 'Spor Salonu', 'Özel Banyo', 'Wifi', 'Klima', 'Otopark'],
    reviews: [
      { author: 'Berk H.', rating: 5, comment: 'Etiler\'de lüks yurt. Her şey mükemmel ama ulaşım var.', date: '2024-03-18', roomType: '1 Kişilik', pricePaid: '4.000 ₺' },
      { author: 'Caner T.', rating: 4, comment: 'Lüks tesisler, yemek hariç fiyat iyi.', date: '2024-02-25', roomType: '2 Kişilik', pricePaid: '3.200 ₺' },
    ]
  },
  {
    id: 'yurt-tercih',
    name: 'Yurt Tercih Merkezi Öğrenci Yurdu',
    type: 'ozel',
    gender: 'kiz',
    coords: [41.0360516387609, 29.099767974593508],
    emoji: '🏫',
    color: '#2563EB',
    priceRange: '3.000-4.000 ₺',
    mealIncluded: false,
    capacity: 180,
    phone: '0216 456 78 90',
    rating: 4.0,
    reviewCount: 92,
    distanceToUni: '6.8 km',
    transport: { type: 'Metro + Otobüs', transfers: 2, duration: '40-50 dk', details: 'M5 Üsküdar → M6 Levent → Otobüs Kavacık' },
    facilities: ['Yemek Hariç', 'Özel Banyo', 'Wifi', 'Çalışma Salonu', 'Kantin'],
    reviews: [
      { author: 'Merve A.', rating: 4, comment: 'Fiyat uygun, temizlik iyi. Ulaşım biraz uzak.', date: '2024-03-12', roomType: '2 Kişilik', pricePaid: '3.400 ₺' },
      { author: 'Gizem K.', rating: 4, comment: 'Kız yurdu olarak güvenli. Yönetim düzenli.', date: '2024-02-08', roomType: '3 Kişilik', pricePaid: '3.000 ₺' },
    ]
  },
];
const center: [number, number] = [40.9950, 29.1600];

// Medipol Üniversitesi Detaylı Bilgiler
const universityInfo = {
  name: 'İstanbul Medipol Üniversitesi',
  campus: 'Kavacık Kampüsü',
  shortName: 'Medipol',
  founded: 2009,
  type: 'Vakıf Üniversitesi',
  rector: 'Prof. Dr. Sabahattin Zaim',
  students: {
    total: 28500,
    undergraduate: 22000,
    graduate: 4500,
    international: 2000
  },
  academic: {
    faculties: 12,
    institutes: 7,
    researchCenters: 25,
    vocationalSchools: 2,
    professors: 850,
    lecturers: 1200
  },
  programs: {
    total: 78,
    undergraduate: 52,
    graduate: 26,
    accredited: 48,
    english: 15
  },
  rankings: {
    urap: 14, // Ulusal sıralama
    world: 1501, // Dünya sıralaması
    innovation: 8
  },
  facilities: {
    hospitals: 3,
    researchLabs: 180,
    libraryBooks: 250000,
    dormCapacity: 3500,
    sportsComplex: true
  },
  contact: {
    phone: '0216 400 22 22',
    email: 'info@medipol.edu.tr',
    website: 'https://www.medipol.edu.tr',
    yokAkademikUrl: 'https://akademik.yok.gov.tr/AkademikArama/view/searchResultviewListAuthorAndUniversities.jsp',
    address: 'Kavacık Mah. Ekinciler Cad. No:19, 34810 Beykoz/İstanbul'
  },
  quickFacts: [
    'Türkiye\'nin en geniş sağlık altyapılı üniversitesi',
    '3 araştirma hastanesi ile pratik eğitim',
    '180\'den fazla modern laboratuvar',
    '%90\'a varan burs imkanı',
    'Erasmus+ anlaşmalı 200+ üniversite'
  ]
};

export type Metric = {
  label: string;
  value: number; // 0-100
  icon: string;
  color: string;
};

export type PriceHistory = {
  service: string;
  price: number;
  currency: string;
  date: string;
  user: string;
};

export type Suggestion = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  rating: number;
  date: string;
  likes: number;
  tags: string[];
};

export type POI = {
  id: string;
  coords: [number, number];
  emoji: string;
  label: string;
  color: string;
  category: SubFilterType;
  address?: string;
  phone?: string;
  hours?: string;
  description?: string;
  metrics?: Metric[];
  suggestions?: Suggestion[];
  studentRating?: number;
  totalVotes?: number;
  priceHistory?: PriceHistory[];
};

const pois: POI[] = [
  // SAĞLIK (6)
  { 
    id: 'sancaktepe-devlet', 
    coords: [40.9798, 29.2355], 
    emoji: '🏥', 
    label: 'Sancaktepe Devlet Hastanesi', 
    color: '#DC2626', 
    category: 'saglik',
    address: 'Yenidoğan Mah. Abdülhamithan Cad. No:12',
    phone: '0216 529 00 00',
    hours: '24 Saat Açık',
    description: 'Tam teşekküllü devlet hastanesi, acil servis mevcut',
    studentRating: 4.2,
    totalVotes: 89,
    metrics: [
      { label: 'Yoğunluk', value: 75, icon: '👥', color: '#F59E0B' },
      { label: 'Doktor Kalitesi', value: 82, icon: '👨‍⚕️', color: '#10B981' },
      { label: 'Hizmet Kalitesi', value: 68, icon: '🏥', color: '#3B82F6' },
      { label: 'Ekipman Modernliği', value: 71, icon: '🔬', color: '#8B5CF6' }
    ],
    suggestions: [
      { id: '1', author: 'Merve K.', avatar: 'M', content: 'Acil servis çok kalabalık oluyor, sabah erken gitmeyi tavsiye ederim. Doktorlar ilgili.', rating: 4, date: '1 hafta önce', likes: 12, tags: ['Acil', 'Kalabalık'] },
      { id: '2', author: 'Can B.', avatar: 'C', content: 'SGK anlaşmalı, ücretsiz muayene. Radyoloji birimi biraz yavaş.', rating: 3, date: '2 hafta önce', likes: 8, tags: ['SGK', 'Ücretsiz'] },
    ]
  },
  { 
    id: 'eczane-celal', 
    coords: [40.9831, 29.2328], 
    emoji: '💊', 
    label: 'Celaleddin Eczanesi', 
    color: '#16A34A', 
    category: 'saglik',
    address: 'Celalleddin Mah. Samandıra Cad. No:45',
    phone: '0216 529 45 67',
    hours: '08:00 - 22:00',
    description: 'Nöbetçi eczane hizmeti mevcut',
    studentRating: 4.5,
    totalVotes: 34,
    metrics: [
      { label: 'İlaç Çeşidi', value: 88, icon: '💊', color: '#10B981' },
      { label: 'Fiyat Uygunluğu', value: 75, icon: '💰', color: '#F59E0B' },
      { label: 'Personel Bilgisi', value: 92, icon: '👨‍⚕️', color: '#3B82F6' }
    ],
    suggestions: [
      { id: '3', author: 'Ali R.', avatar: 'A', content: 'Nöbetçi oldukları geceler indirim yapıyorlar. Reçetesiz ilaç konusunda yardımcı oluyorlar.', rating: 5, date: '3 gün önce', likes: 15, tags: ['İndirim', 'Nöbetçi'] }
    ]
  },
  { 
    id: 'medipol-hastane', 
    coords: [40.9912, 29.2415], 
    emoji: '🏥', 
    label: 'Medipol Üniv. Hastanesi', 
    color: '#DC2626', 
    category: 'saglik',
    address: 'Kavacık Mah. Ekinciler Cad. No:19',
    phone: '0216 681 51 00',
    hours: '24 Saat Açık',
    description: 'Özel üniversite hastanesi'
  },
  { 
    id: 'eczane-samandira', 
    coords: [40.9845, 29.2295], 
    emoji: '💊', 
    label: 'Samandıra Eczanesi', 
    color: '#16A34A', 
    category: 'saglik',
    address: 'Samandıra Merkez Mah. Cadde No:78',
    phone: '0216 529 12 34',
    hours: '08:30 - 21:00'
  },
  { 
    id: 'saglik-ocagi', 
    coords: [40.9818, 29.2342], 
    emoji: '🩺', 
    label: 'Celalleddin Aile Sağlığı', 
    color: '#16A34A', 
    category: 'saglik',
    address: 'Celalleddin Mah. Yurt Sok. No:3',
    phone: '0216 529 89 01',
    hours: '08:30 - 17:00'
  },
  { 
    id: 'dis-klinik', 
    coords: [40.9825, 29.2315], 
    emoji: '🦷', 
    label: 'Özel Diş Kliniği', 
    color: '#DC2626', 
    category: 'saglik',
    address: 'Celalleddin Mah. Ana Cad. No:56',
    phone: '0216 529 67 89',
    hours: '09:00 - 20:00'
  },
  
  // MARKETLER (7)
  { 
    id: 'bim-celal', 
    coords: [40.9828, 29.2325], 
    emoji: '🏪', 
    label: 'BİM Celalleddin', 
    color: '#D97706', 
    category: 'market',
    address: 'Celalleddin Mah. Samandıra Cad. No:12/A',
    hours: '08:30 - 22:00',
    description: 'Yurdun hemen yanında, uygun fiyatlı market',
    studentRating: 4.3,
    totalVotes: 267,
    metrics: [
      { label: 'Fiyat', value: 95, icon: '💰', color: '#10B981' },
      { label: 'Ürün Çeşidi', value: 70, icon: '🛒', color: '#F59E0B' },
      { label: 'Konum', value: 98, icon: '📍', color: '#3B82F6' },
      { label: 'Kalite', value: 72, icon: '⭐', color: '#8B5CF6' }
    ],
    suggestions: [
      { id: '9', author: 'Deniz Y.', avatar: 'D', content: 'Yurdun dibinde, 2 dakika yürüme. Perşembe günleri yeni ürün geliyor, o gün git.', rating: 5, date: '3 gün önce', likes: 45, tags: ['Yakın', 'Perşembe'] },
      { id: '10', author: 'Cemre A.', avatar: 'C', content: 'Hazır yemek bölümü ucuz ama sınırlı. Temel ihtiyaçlar için ideal, özel ürün yok.', rating: 4, date: '1 hafta önce', likes: 28, tags: ['Ucuz', 'Temel'] }
    ]
  },
  { 
    id: 'a101-celal', 
    coords: [40.9835, 29.2335], 
    emoji: '🏪', 
    label: 'A101 Celalleddin', 
    color: '#D97706', 
    category: 'market',
    address: 'Celalleddin Mah. Fatih Cad. No:23',
    hours: '08:30 - 22:00'
  },
  { 
    id: 'sok-market', 
    coords: [40.9815, 29.2340], 
    emoji: '🛒', 
    label: 'Şok Market', 
    color: '#D97706', 
    category: 'market',
    address: 'Celalleddin Mah. İstiklal Sok. No:8',
    hours: '08:00 - 23:00'
  },
  { 
    id: 'migros-jet', 
    coords: [40.9842, 29.2308], 
    emoji: '🛒', 
    label: 'Migros Jet', 
    color: '#D97706', 
    category: 'market',
    address: 'Samandıra Merkez Mah. Atatürk Bulv. No:45',
    hours: '07:00 - 23:00'
  },
  { 
    id: 'hakmar', 
    coords: [40.9808, 29.2312], 
    emoji: '🏪', 
    label: 'Hakmar Express', 
    color: '#D97706', 
    category: 'market',
    address: 'Celalleddin Mah. Yıldız Sok. No:15',
    hours: '09:00 - 21:00'
  },
  { 
    id: 'tarim-kredi', 
    coords: [40.9850, 29.2285], 
    emoji: '🥬', 
    label: 'Tarım Kredi Kooperatifi', 
    color: '#16A34A', 
    category: 'market',
    address: 'Samandıra Mah. Çarşı İçi No:3',
    hours: '07:30 - 20:00',
    description: 'Taze sebze-meyve ve organik ürünler'
  },
  { 
    id: 'carrefour-sa', 
    coords: [40.9795, 29.2380], 
    emoji: '🛒', 
    label: 'CarrefourSA', 
    color: '#2563EB', 
    category: 'market',
    address: 'Yenidoğan Mah. Abdülhamithan Cad. No:88',
    hours: '09:00 - 22:00'
  },
  
  // RESMİ KURUMLAR (5)
  { 
    id: 'ptt-celal', 
    coords: [40.9838, 29.2322], 
    emoji: '📮', 
    label: 'PTT Celalleddin Şubesi', 
    color: '#2563EB', 
    category: 'resmi',
    address: 'Celalleddin Mah. Postane Sok. No:1',
    phone: '0216 529 40 00',
    hours: '08:30 - 17:00'
  },
  { 
    id: 'ziraat-bank', 
    coords: [40.9830, 29.2330], 
    emoji: '🏦', 
    label: 'Ziraat Bankası', 
    color: '#DC2626', 
    category: 'resmi',
    address: 'Celalleddin Mah. Banka Sok. No:4',
    phone: '0216 529 50 50',
    hours: '09:00 - 17:00'
  },
  { 
    id: 'halk-bank', 
    coords: [40.9820, 29.2345], 
    emoji: '🏦', 
    label: 'Halkbank', 
    color: '#DC2626', 
    category: 'resmi',
    address: 'Celalleddin Mah. Ticaret Cad. No:67',
    phone: '0216 529 60 60',
    hours: '09:00 - 17:00'
  },
  { 
    id: 'sancaktepe-belediye', 
    coords: [40.9805, 29.2365], 
    emoji: '🏛️', 
    label: 'Sancaktepe Belediyesi', 
    color: '#2563EB', 
    category: 'resmi',
    address: 'Yenidoğan Mah. Belediye Cad. No:1',
    phone: '0216 606 00 00',
    hours: '08:30 - 17:00'
  },
  { 
    id: 'noter', 
    coords: [40.9848, 29.2298], 
    emoji: '📜', 
    label: 'Noter', 
    color: '#2563EB', 
    category: 'resmi',
    address: 'Samandıra Mah. Adalet Sok. No:12',
    hours: '09:00 - 17:00'
  },
  
  // EĞİTİM (4)
  { 
    id: 'sancaktepe-kutuphane', 
    coords: [40.9802, 29.2370], 
    emoji: '📚', 
    label: 'Sancaktepe İlçe Kütüphanesi', 
    color: '#7C3AED', 
    category: 'egitim',
    address: 'Yenidoğan Mah. Kütüphane Sok. No:2',
    phone: '0216 529 70 70',
    hours: '08:00 - 20:00',
    description: 'Ücretsiz wifi, çalışma salonları'
  },
  { 
    id: 'ismek-celal', 
    coords: [40.9833, 29.2310], 
    emoji: '🎨', 
    label: 'İSMEK Celalleddin', 
    color: '#7C3AED', 
    category: 'egitim',
    address: 'Celalleddin Mah. Eğitim Cad. No:34',
    phone: '0216 529 80 80',
    hours: '09:00 - 21:00',
    description: 'Ücretsiz mesleki kurslar'
  },
  { 
    id: 'kurs-merkezi', 
    coords: [40.9812, 29.2355], 
    emoji: '📖', 
    label: 'Sancaktepe Kurs Merkezi', 
    color: '#7C3AED', 
    category: 'egitim',
    address: 'Celalleddin Mah. Gençlik Sok. No:9',
    hours: '09:00 - 22:00'
  },
  { 
    id: 'dershane', 
    coords: [40.9845, 29.2275], 
    emoji: '✏️', 
    label: 'Özel Dershane', 
    color: '#7C3AED', 
    category: 'egitim',
    address: 'Samandıra Mah. Okul Sok. No:21'
  },
  
  // YEMEK & KAFE (5)
  { 
    id: 'kent-lokanta', 
    coords: [40.9825, 29.2370], 
    emoji: '🍽️', 
    label: 'Kent Lokantası', 
    color: '#EA580C', 
    category: 'yemek',
    address: 'Celalleddin Mah. Yemek Sok. No:6',
    hours: '07:00 - 22:00',
    description: 'Öğrenci menüsü: 45₺',
    studentRating: 4.2,
    totalVotes: 178,
    metrics: [
      { label: 'Lezzet', value: 75, icon: '😋', color: '#F59E0B' },
      { label: 'Porsyon', value: 85, icon: '🍽️', color: '#10B981' },
      { label: 'Fiyat Uygunluğu', value: 95, icon: '💰', color: '#3B82F6' },
      { label: 'Çeşitlilik', value: 70, icon: '🥗', color: '#8B5CF6' }
    ],
    priceHistory: [
      { service: 'Öğrenci Menüsü (4 çeşit)', price: 45, currency: '₺', date: '30 dk önce', user: 'Volkan K.' },
      { service: 'Etli Güveç + Pilav', price: 65, currency: '₺', date: '2 saat önce', user: 'Ayşegül T.' },
      { service: 'Karnıyarık + Çorba', price: 55, currency: '₺', date: '4 saat önce', user: 'Hakan B.' }
    ],
    suggestions: [
      { id: '21', author: 'Volkan K.', avatar: 'V', content: '45₺ öğrenci menüsüne doyuyosun abi 4 çeşit yemek + salata + çorba var. Kalori hesabı yapanlar için ideal.', rating: 5, date: '3 gün önce', likes: 42, tags: ['Öğrenci Menüsü', 'Doyurucu'] },
      { id: '22', author: 'Gizem Ö.', avatar: 'G', content: 'Öğle 12-2 arası savaş alanı gibi ya sıra bekleme delirtiyo. Ama fiyatlar yurdun yemekhanesinden bile ucuz neredeyse.', rating: 4, date: '1 hafta önce', likes: 28, tags: ['Kalabalık', 'Ucuz'] },
      { id: '23', author: 'Murat E.', avatar: 'M', content: 'Akşam 6dan sonra kalanlar indirimli satıyo. Bazen 35₺ye menü kapıyosun temizinden.', rating: 5, date: '5 gün önce', likes: 35, tags: ['İndirim', 'Akşam'] }
    ]
  },
  { 
    id: 'cay-evi', 
    coords: [40.9832, 29.2318], 
    emoji: '🍵', 
    label: 'Öğrenci Çay Evi', 
    color: '#EA580C', 
    category: 'yemek',
    address: 'Celalleddin Mah. Çaycı Sok. No:11',
    hours: '08:00 - 23:00',
    description: 'Kahvaltı tabağı: 35₺, Sınırsız çay'
  },
  { 
    id: 'donerci', 
    coords: [40.9818, 29.2328], 
    emoji: '🥙', 
    label: 'Samandıra Dönercisi', 
    color: '#EA580C', 
    category: 'yemek',
    address: 'Celalleddin Mah. Döner Sok. No:7',
    hours: '10:00 - 02:00',
    description: 'Et dürüm: 40₺, Tavuk dürüm: 30₺',
    studentRating: 4.4,
    totalVotes: 203,
    metrics: [
      { label: 'Lezzet', value: 88, icon: '😋', color: '#F59E0B' },
      { label: 'Porsyon', value: 92, icon: '🍽️', color: '#10B981' },
      { label: 'Fiyat Uygunluğu', value: 95, icon: '💰', color: '#3B82F6' },
      { label: 'Hijyen', value: 76, icon: '✨', color: '#8B5CF6' }
    ],
    priceHistory: [
      { service: 'Tavuk Dürüm + Ayran', price: 35, currency: '₺', date: '2 saat önce', user: 'Burak Y.' },
      { service: 'Et Dürüm (bol malz)', price: 45, currency: '₺', date: '5 saat önce', user: 'Canan K.' },
      { service: 'İskender (öğrenci)', price: 55, currency: '₺', date: '1 gün önce', user: 'Mert T.' }
    ],
    suggestions: [
      { id: '6', author: 'Ozan K.', avatar: 'O', content: 'Kanka tavuk dürüm 30₺ ama doyuruyo ha içi dolu dolu! Acılı isteyin, acı sosu ev yapımı gibi tadı güzel. Yancı turşu bedava alıyon.', rating: 5, date: '2 gün önce', likes: 31, tags: ['Ucuz', 'Lezzetli'] },
      { id: '7', author: 'Selin P.', avatar: 'S', content: 'Gece 12den sonra gidin taze lavaş pişiriyolar sıcak sıcak. Öğrenci menüsü dürüm+ayran 35₺ bence kaçmaz.', rating: 5, date: '1 hafta önce', likes: 27, tags: ['Öğrenci Menüsü', 'Gece Açık'] },
      { id: '8', author: 'Emre D.', avatar: 'E', content: 'Abi mekan küçük ya oturacak yer yok gibi. Paket alıp gidin daha iyi. Et döner bi tık yağlı ama yenecek gibi.', rating: 4, date: '2 hafta önce', likes: 12, tags: ['Paket', 'Yağlı'] }
    ]
  },
  { 
    id: 'lahmacun', 
    coords: [40.9840, 29.2335], 
    emoji: '🍕', 
    label: 'Gaziantep Lahmacun', 
    color: '#EA580C', 
    category: 'yemek',
    address: 'Celalleddin Mah. Fırın Sok. No:14',
    hours: '10:00 - 22:00'
  },
  { 
    id: 'burger-king', 
    coords: [40.9788, 29.2390], 
    emoji: '🍔', 
    label: 'Burger King', 
    color: '#DC2626', 
    category: 'yemek',
    address: 'Yenidoğan Mah. AVM İçi No:45',
    hours: '10:00 - 23:00'
  },
  
  // KAFE & SOSYAL (4)
  { 
    id: 'starbucks', 
    coords: [40.9792, 29.2385], 
    emoji: '☕', 
    label: 'Starbucks', 
    color: '#059669', 
    category: 'kafe',
    address: 'Yenidoğan Mah. AVM Yanı No:12',
    hours: '07:00 - 23:00',
    description: 'Wifi mevcut, çalışma alanları',
    studentRating: 4.5,
    totalVotes: 145,
    metrics: [
      { label: 'Wifi Hızı', value: 88, icon: '📶', color: '#3B82F6' },
      { label: 'Çalışma Ortamı', value: 90, icon: '💻', color: '#8B5CF6' },
      { label: 'Fiyat', value: 45, icon: '💰', color: '#EF4444' },
      { label: 'Gürültü Seviyesi', value: 75, icon: '🔊', color: '#F59E0B' }
    ],
    priceHistory: [
      { service: 'Grande Cold Brew', price: 85, currency: '₺', date: '1 saat önce', user: 'Deniz G.' },
      { service: 'Tall Latte + Pasta', price: 120, currency: '₺', date: '3 saat önce', user: 'İlayda B.' },
      { service: 'Venti Filtre Kahve', price: 65, currency: '₺', date: '5 saat önce', user: 'Serkan T.' }
    ],
    suggestions: [
      { id: '13', author: 'Ela S.', avatar: 'E', content: 'Kankalar final haftası burdayım ben. Üst kat sessiz oluyo genelde, prizler var ama sınırlı. Kahve pahalı ama 3 saat oturabiliyosun.', rating: 5, date: '3 gün önce', likes: 34, tags: ['Final', 'Sessiz'] },
      { id: '14', author: 'Arda C.', avatar: 'A', content: 'Öğrenci kartı %10 indirim yapıyo unutmayın. Grup çalışması için ideal ama fiyatlar gerçekten uçmuş abi 80₺ kahve.', rating: 4, date: '1 hafta önce', likes: 21, tags: ['İndirim', 'Grup'] },
      { id: '20', author: 'Ceren Y.', avatar: 'C', content: 'Haftasonu hiç gitmeyin yer bulamıyosun. Haftaiçi sabahlar bomboş. Wifi şifresi yok direk bağlanıyo güzel.', rating: 4, date: '4 gün önce', likes: 16, tags: ['Wifi', 'Kalabalık'] }
    ]
  },
  { 
    id: 'kahve-dunyasi', 
    coords: [40.9822, 29.2305], 
    emoji: '☕', 
    label: 'Kahve Dünyası', 
    color: '#059669', 
    category: 'kafe',
    address: 'Samandıra Mah. Kahve Sok. No:18',
    hours: '08:00 - 22:00'
  },
  { 
    id: 'mangal-keyfi', 
    coords: [40.9855, 29.2265], 
    emoji: '🍖', 
    label: 'Mangal Keyfi Restaurant', 
    color: '#EA580C', 
    category: 'yemek',
    address: 'Samandıra Mah. Piknik Alanı Yanı',
    phone: '0216 529 99 99',
    hours: '11:00 - 23:00'
  },
  { 
    id: 'oyun-salonu', 
    coords: [40.9815, 29.2365], 
    emoji: '🎮', 
    label: 'PlayStation & Oyun Salonu', 
    color: '#7C3AED', 
    category: 'eglence',
    address: 'Celalleddin Mah. Gençlik Cad. No:29',
    hours: '10:00 - 02:00',
    description: 'Saatlik: 15₺'
  },
  
  // GÜZELLİK & KİŞİSEL BAKIM (4)
  { 
    id: 'berber-celal', 
    coords: [40.9828, 29.2315], 
    emoji: '💈', 
    label: 'Celaleddin Berber', 
    color: '#7C3AED', 
    category: 'guzellik',
    address: 'Celalleddin Mah. Berberler Sok. No:3',
    hours: '09:00 - 21:00',
    description: 'Saç kesim: 50₺',
    studentRating: 4.1,
    totalVotes: 78,
    metrics: [
      { label: 'Yetenek', value: 82, icon: '✂️', color: '#8B5CF6' },
      { label: 'Fiyat', value: 85, icon: '💰', color: '#10B981' },
      { label: 'Hijyen', value: 75, icon: '✨', color: '#F59E0B' },
      { label: 'Sıra Bekleme', value: 60, icon: '⏱️', color: '#EF4444' }
    ],
    priceHistory: [
      { service: 'Saç Kesim + Sakal', price: 60, currency: '₺', date: '4 saat önce', user: 'Tolga A.' },
      { service: 'Sadece Saç Kesim', price: 50, currency: '₺', date: '1 gün önce', user: 'Furkan M.' },
      { service: 'Saç + Sakal + Maske', price: 80, currency: '₺', date: '2 gün önce', user: 'Efe K.' }
    ],
    suggestions: [
      { id: '11', author: 'Kerem B.', avatar: 'K', content: '50₺ var ya bu civarda bulamazsın başka yerde. Ama randevusuz gidince min 20dk bekliyosun. Sakal düzeltme bedava oluyo saçla beraber onu sor.', rating: 4, date: '1 hafta önce', likes: 19, tags: ['Ucuz', 'Randevu'] },
      { id: '12', author: 'Yasin M.', avatar: 'Y', content: 'Öğrenci indirimi varmış %10 yapıyo sormayı unutmayın. Makasları tek kullanımlık kılıf giydiriyolar hijyen iyi.', rating: 5, date: '2 hafta önce', likes: 22, tags: ['İndirim', 'Hijyen'] },
      { id: '19', author: 'Barış Ç.', avatar: 'B', content: 'Usta bi tık eski moda kesiyo ama düzgün yapıyo. Gençlik tarafları falan bilmiyolar pek ama temiz iş çıkarıyolar.', rating: 4, date: '5 gün önce', likes: 11, tags: ['Temiz', 'Klasik'] }
    ]
  },
  { 
    id: 'kuafor', 
    coords: [40.9838, 29.2342], 
    emoji: '💇‍♀️', 
    label: 'Güzellik Kuaför', 
    color: '#7C3AED', 
    category: 'guzellik',
    address: 'Celalleddin Mah. Kadınlar Pazarı No:8',
    hours: '09:00 - 20:00'
  },
  { 
    id: 'spor-salonu', 
    coords: [40.9808, 29.2338], 
    emoji: '💪', 
    label: 'Fit Life Spor Salonu', 
    color: '#059669', 
    category: 'spor',
    address: 'Celalleddin Mah. Spor Kompleksi No:15',
    phone: '0216 529 11 11',
    hours: '06:00 - 23:00',
    description: 'Öğrenci indirimli: 150₺/ay',
    studentRating: 4.6,
    totalVotes: 156,
    metrics: [
      { label: 'Ekipman Kalitesi', value: 85, icon: '🏋️', color: '#8B5CF6' },
      { label: 'Temizlik', value: 78, icon: '✨', color: '#10B981' },
      { label: 'Kalabalık', value: 65, icon: '👥', color: '#F59E0B' },
      { label: 'Fiyat/Performans', value: 90, icon: '💰', color: '#3B82F6' }
    ],
    priceHistory: [
      { service: 'Aylık Öğrenci Üyelik', price: 150, currency: '₺', date: '3 gün önce', user: 'Ufuk B.' },
      { service: 'Günlük Tek Giriş', price: 30, currency: '₺', date: '1 gün önce', user: 'Aslı N.' },
      { service: 'PT Seansı (öğrenci)', price: 200, currency: '₺', date: '5 gün önce', user: 'Cem S.' }
    ],
    suggestions: [
      { id: '4', author: 'Berk S.', avatar: 'B', content: 'Kankalar sabah 7-9 arası full boş ya kimse yok! Öğrenci kartı göster 150₺ oluyo, başka yerler 250₺ istiyo. Ağırlık bölümü yeterli ama smith machine tek var.', rating: 5, date: '5 gün önce', likes: 23, tags: ['Bomboş', 'Öğrenci Dostu'] },
      { id: '5', author: 'Zeynep T.', avatar: 'Z', content: 'Kardiyo makinaları bi eski ama iş görüyo. Duşlar temiz gerçekten hijyene dikkat ediyolar. Haftasonu 5-8 arası rezalet kalabalık abi beklemekten antrenman bitiyo.', rating: 4, date: '1 hafta önce', likes: 18, tags: ['Temiz', 'Kalabalık'] },
      { id: '18', author: 'Kaan D.', avatar: 'K', content: 'PT aldım 200₺ öğrenciye, adam gayet ilgili ama saat tutuyo 50dk da bitiriyo seansı. Yinede fiyat iyi ya.', rating: 4, date: '3 gün önce', likes: 8, tags: ['PT', 'Öğrenci'] }
    ]
  },
  { 
    id: 'kuru-temizleme', 
    coords: [40.9842, 29.2320], 
    emoji: '👔', 
    label: 'Kuru Temizleme', 
    color: '#2563EB', 
    category: 'hizmet',
    address: 'Celalleddin Mah. Hizmet Sok. No:19',
    hours: '08:00 - 20:00'
  },
];

// Alt kategoriler (işletmeler)
export type SubFilterType = 'saglik' | 'market' | 'resmi' | 'egitim' | 'yemek' | 'kafe' | 'guzellik' | 'eglence' | 'spor' | 'hizmet';

// Üst kategoriler (5 ana kategori)
export type MainCategoryId = 'tumu' | 'isletmeler' | 'ulasim' | 'konaklama' | 'eglence' | 'diger' | 'yurtlar';

// Alt kategori tanımı
const subFilters: { id: SubFilterType; label: string; emoji: string }[] = [
  { id: 'saglik', label: 'Sağlık', emoji: '🏥' },
  { id: 'market', label: 'Market', emoji: '🛒' },
  { id: 'resmi', label: 'Resmi', emoji: '📋' },
  { id: 'egitim', label: 'Eğitim', emoji: '📚' },
  { id: 'yemek', label: 'Yemek', emoji: '🍽️' },
  { id: 'kafe', label: 'Kafe', emoji: '☕' },
  { id: 'guzellik', label: 'Güzellik', emoji: '💈' },
  { id: 'spor', label: 'Spor', emoji: '💪' },
  { id: 'eglence', label: 'Eğlence', emoji: '🎮' },
  { id: 'hizmet', label: 'Hizmet', emoji: '🔧' },
];

// Üst kategori tanımları
const mainCategories: { id: MainCategoryId; label: string; emoji: string; subs?: SubFilterType[] }[] = [
  { id: 'tumu', label: 'Tümü', emoji: '📍' },
  { id: 'yurtlar', label: 'Yurtlar', emoji: '🏘️' },
  { 
    id: 'isletmeler', 
    label: 'İşletmeler', 
    emoji: '🏪',
    subs: ['saglik', 'market', 'resmi', 'egitim', 'yemek', 'kafe', 'guzellik', 'spor', 'eglence', 'hizmet']
  },
  { id: 'ulasim', label: 'Ulaşım', emoji: '🚌' },
  { id: 'konaklama', label: 'Konaklama', emoji: '🏠' },
  { id: 'diger', label: 'Diğer', emoji: '📌' },
];

export function MapView() {
  const [mod, setMod] = useState<null | {
    L: typeof import("leaflet");
    RL: typeof import("react-leaflet");
    blueIcon: import("leaflet").Icon;
    greenIcon: import("leaflet").Icon;
  }>(null);
  const [activeMainCategory, setActiveMainCategory] = useState<MainCategoryId | null>(null);
  const [activeSubFilter, setActiveSubFilter] = useState<SubFilterType | null>(null);
  const [expandedMain, setExpandedMain] = useState<MainCategoryId | null>(null);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isUniversityPanelOpen, setIsUniversityPanelOpen] = useState(false);
  const [showDormsPanel, setShowDormsPanel] = useState(false);
  const [dormFilter, setDormFilter] = useState<DormGender | 'all'>('all');
  const [selectedDorm, setSelectedDorm] = useState<Dorm | null>(null);
  const [isDormDetailOpen, setIsDormDetailOpen] = useState(false);
  const [showDormsOnMap, setShowDormsOnMap] = useState(false);
  const [dormsCategoryActive, setDormsCategoryActive] = useState(false);
  const [pinnedLocation, setPinnedLocation] = useState<{coords: [number, number], name: string, type: 'dorm' | 'poi' | 'uni'} | null>(null);
  const mapRef = useRef<any>(null);
  const [currentZoom, setCurrentZoom] = useState(11); // Varsayılan zoom

  useEffect(() => {
    let cancelled = false;
    Promise.all([import("leaflet"), import("react-leaflet")]).then(([leaflet, rl]) => {
      if (cancelled) return;
      const L = leaflet.default ?? leaflet;
      // Fix default marker icons
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const blueIcon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      const greenIcon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      setMod({ L, RL: rl, blueIcon, greenIcon });
      window.dispatchEvent(new Event("resize"));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!mod) {
    return (
      <div style={{ height: 'calc(100vh - 112px)', width: '100%' }} className="animate-pulse rounded-xl border border-border bg-muted shadow-sm" />
    );
  }

  const { L, RL, blueIcon, greenIcon } = mod;
  const { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } = RL;

  const makePill = (emoji: string, label: string, color: string, zoom: number = 14) => {
    // Çok küçük emoji'ler - iç içe geçmesin
    let emojiSize = '12px';
    let fontSize = '0px';
    let padding = '2px 4px';
    let displayLabel = '';
    let borderWidth = '1px';
    
    if (zoom >= 16) {
      // Çok yakın: Normal emoji + isim
      emojiSize = '14px';
      fontSize = '10px';
      padding = '3px 6px';
      displayLabel = label.length > 12 ? label.substring(0, 12) + '..' : label;
    } else if (zoom >= 14) {
      // Yakın: Küçük emoji + kısa isim
      emojiSize = '12px';
      fontSize = '9px';
      padding = '2px 5px';
      displayLabel = label.length > 8 ? label.substring(0, 8) + '..' : label;
    } else if (zoom >= 12) {
      // Orta: Mini emoji
      emojiSize = '11px';
      fontSize = '0px';
      padding = '2px 4px';
      displayLabel = '';
    } else {
      // Uzak: Micro emoji
      emojiSize = '10px';
      fontSize = '0px';
      padding = '1px 3px';
      displayLabel = '';
    }
    
    const content = displayLabel 
      ? `<span style="font-size:${emojiSize};margin-right:2px">${emoji}</span><span style="font-size:${fontSize}">${displayLabel}</span>`
      : `<span style="font-size:${emojiSize}">${emoji}</span>`;
    
    return L.divIcon({
      className: '',
      html: `<div style="
        background: white;
        border: ${borderWidth} solid ${color};
        border-radius: 99px;
        padding: ${padding};
        font-weight: 500;
        color: ${color};
        white-space: nowrap;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        line-height: 1;
        display: inline-flex;
        align-items: center;
        transition: all 0.2s ease;
        cursor: pointer;
        min-width: auto;
      ">${content}</div>`,
      iconSize: undefined,
      iconAnchor: [0, 0]
    });
  };

  const filteredPois = activeMainCategory === null 
    ? [] // Başlangıçta hiçbiri seçili değilse gösterme
    : activeMainCategory === 'tumu' 
      ? pois 
      : activeMainCategory === 'isletmeler' && activeSubFilter
        ? pois.filter(poi => poi.category === activeSubFilter)
        : []; // Diğer üst kategoriler için şimdilik boş

  const handlePOIClick = (poi: POI) => {
    setSelectedPOI(poi);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedPOI(null), 300);
  };

  const openUniversityPanel = () => {
    setIsUniversityPanelOpen(true);
  };

  const closeUniversityPanel = () => {
    setIsUniversityPanelOpen(false);
  };

  const openDormsPanel = () => {
    setShowDormsPanel(true);
    setIsUniversityPanelOpen(false);
  };

  const closeDormsPanel = () => {
    setShowDormsPanel(false);
  };

  const openDormDetail = (dorm: Dorm) => {
    setSelectedDorm(dorm);
    setIsDormDetailOpen(true);
  };

  const closeDormDetail = () => {
    setIsDormDetailOpen(false);
    setTimeout(() => setSelectedDorm(null), 300);
  };

  const toggleDormsOnMap = () => {
    setShowDormsOnMap(!showDormsOnMap);
  };

  const activateDormsCategory = () => {
    setDormsCategoryActive(true);
    setShowDormsOnMap(true);
  };

  const deactivateDormsCategory = () => {
    setDormsCategoryActive(false);
    setShowDormsOnMap(false);
  };

  const zoomToDorm = (dorm: Dorm, openDetail: boolean = false) => {
    if (mapRef.current) {
      mapRef.current.flyTo(dorm.coords, 16, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
    closeDormsPanel();
    if (openDetail) {
      setTimeout(() => openDormDetail(dorm), 500);
    }
  };

  // Manuel pinleme fonksiyonu
  const pinLocation = (coords: [number, number], name: string, type: 'dorm' | 'poi' | 'uni') => {
    setPinnedLocation({ coords, name, type });
  };

  const unpinLocation = () => {
    setPinnedLocation(null);
  };

  // Google Maps açma fonksiyonu
  const openInGoogleMaps = (coords: [number, number], name: string) => {
    const [lat, lng] = coords;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  };

  function MapZoomHandler() {
    const map = useMap();
    useEffect(() => {
      mapRef.current = map;
      const handleZoom = () => {
        setCurrentZoom(map.getZoom());
      };
      map.on('zoomend', handleZoom);
      // İlk değeri al
      setCurrentZoom(map.getZoom());
      return () => {
        map.off('zoomend', handleZoom);
      };
    }, [map]);
    return null;
  }

  return (
    <div style={{ height: 'calc(100vh - 112px)', width: '100%' }} className="overflow-hidden rounded-xl border border-border shadow-sm relative">
      {/* Main Category Filter Pills */}
      <div className="absolute top-[120px] left-4 z-[1000] flex flex-col gap-2">
        {mainCategories.map((mainCat) => (
          <div key={mainCat.id}>
            <button
              onClick={() => {
                if (mainCat.id === 'tumu') {
                  // Tümü toggle
                  setActiveMainCategory(activeMainCategory === 'tumu' ? null : 'tumu');
                  setExpandedMain(null);
                  deactivateDormsCategory();
                } else if (mainCat.id === 'isletmeler') {
                  // İşletmeler - expand/collapse
                  if (expandedMain === 'isletmeler') {
                    setExpandedMain(null);
                    setActiveMainCategory(null);
                    setActiveSubFilter(null);
                  } else {
                    setExpandedMain('isletmeler');
                    setActiveMainCategory('isletmeler');
                  }
                  deactivateDormsCategory();
                } else if (mainCat.id === 'yurtlar') {
                  // Yurtlar kategorisi - toggle
                  if (activeMainCategory === 'yurtlar') {
                    setActiveMainCategory(null);
                    deactivateDormsCategory();
                  } else {
                    setActiveMainCategory('yurtlar');
                    setExpandedMain(null);
                    setActiveSubFilter(null);
                    activateDormsCategory();
                  }
                } else {
                  // Diğer üst kategoriler
                  setActiveMainCategory(mainCat.id);
                  setExpandedMain(null);
                  setActiveSubFilter(null);
                  deactivateDormsCategory();
                }
              }}
              className={`px-[10px] py-[6px] rounded-[20px] text-[11px] font-medium transition-colors whitespace-nowrap ${
                activeMainCategory === mainCat.id 
                  ? 'bg-blue-500 text-white border border-blue-500' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
              style={{
                borderColor: activeMainCategory === mainCat.id ? '#3B82F6' : '#D1D5DB'
              }}
            >
              {mainCat.emoji} {mainCat.label}
            </button>
            
            {/* Alt kategoriler - sadece İşletmeler için göster */}
            {mainCat.id === 'isletmeler' && expandedMain === 'isletmeler' && mainCat.subs && (
              <div className="ml-3 mt-2 flex flex-col gap-1.5">
                {subFilters
                  .filter(sub => mainCat.subs?.includes(sub.id))
                  .map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSubFilter(activeSubFilter === sub.id ? null : sub.id)}
                      className={`px-3 py-1.5 rounded-[16px] text-[10px] font-medium transition-colors whitespace-nowrap ${
                        activeSubFilter === sub.id 
                          ? 'bg-green-500 text-white border border-green-500' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                      }`}
                    >
                      {sub.emoji} {sub.label}
                    </button>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <MapContainer
        center={uni}
        zoom={14}
        minZoom={10}
        maxZoom={18}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {/* Medipol Üniversitesi - Özel Tasarımlı Marker */}
        <Marker 
          position={uni} 
          icon={L.divIcon({
            className: '',
            html: `<div style="
              background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);
              border: 3px solid white;
              border-radius: 50%;
              width: 50px;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 20px rgba(30, 64, 175, 0.5), 0 0 0 4px rgba(255,255,255,0.3);
              cursor: pointer;
              animation: pulse 2s infinite;
            ">
              <span style="font-size: 24px;">🎓</span>
            </div>
            <div style="
              position: absolute;
              bottom: -30px;
              left: 50%;
              transform: translateX(-50%);
              background: #1e40af;
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: 600;
              white-space: nowrap;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            ">Medipol</div>`,
            iconSize: [50, 80],
            iconAnchor: [25, 40]
          })}
          eventHandlers={{
            click: () => openUniversityPanel(),
          }}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-blue-600 text-lg">🎓 {universityInfo.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{universityInfo.campus}</p>
              <button
                onClick={() => openUniversityPanel()}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Detaylı Bilgiler →
              </button>
            </div>
          </Popup>
        </Marker>
        {/* Dorm Markers - Only show when dormsCategoryActive is true */}
        {dormsCategoryActive && dorms.map((d) => (
          <Marker 
            key={d.id}
            position={d.coords}
            icon={L.divIcon({
              className: '',
              html: `<div style="
                background: ${d.type === 'kyk' ? '#DC2626' : '#2563EB'};
                border: 2px solid white;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                cursor: pointer;
                font-size: 16px;
              ">${d.emoji}</div>
              <div style="
                position: absolute;
                bottom: -18px;
                left: 50%;
                transform: translateX(-50%);
                background: ${d.type === 'kyk' ? '#DC2626' : '#2563EB'};
                color: white;
                padding: 2px 6px;
                border-radius: 10px;
                font-size: 9px;
                font-weight: 600;
                white-space: nowrap;
              ">${d.type === 'kyk' ? 'KYK' : 'ÖZEL'}</div>`,
              iconSize: [36, 50],
              iconAnchor: [18, 25]
            })}
            eventHandlers={{
              click: () => openDormDetail(d),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{d.emoji}</span>
                  <div>
                    <h3 className="font-bold text-sm">{d.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${d.type === 'kyk' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {d.type === 'kyk' ? 'KYK' : 'ÖZEL'}
                      </span>
                      <span className="text-[10px] text-gray-500">{d.distanceToUni}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600 font-semibold">{d.priceRange}</span>
                  <span className="text-gray-500">⭐ {d.rating}</span>
                </div>
                <button
                  onClick={() => openDormDetail(d)}
                  className="mt-2 w-full bg-blue-600 text-white py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                >
                  Detaylar →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Dorm Markers - Only show when showDormsOnMap is true */}
        {showDormsOnMap && dorms.map((d) => (
          <Marker 
            key={d.id}
            position={d.coords}
            icon={L.divIcon({
              className: '',
              html: `<div style="
                background: ${d.type === 'kyk' ? '#DC2626' : '#2563EB'};
                border: 2px solid white;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                cursor: pointer;
                font-size: 16px;
              ">${d.emoji}</div>
              <div style="
                position: absolute;
                bottom: -18px;
                left: 50%;
                transform: translateX(-50%);
                background: ${d.type === 'kyk' ? '#DC2626' : '#2563EB'};
                color: white;
                padding: 2px 6px;
                border-radius: 10px;
                font-size: 9px;
                font-weight: 600;
                white-space: nowrap;
              ">${d.type === 'kyk' ? 'KYK' : 'ÖZEL'}</div>`,
              iconSize: [36, 50],
              iconAnchor: [18, 25]
            })}
            eventHandlers={{
              click: () => openDormDetail(d),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{d.emoji}</span>
                  <div>
                    <h3 className="font-bold text-sm">{d.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${d.type === 'kyk' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {d.type === 'kyk' ? 'KYK' : 'ÖZEL'}
                      </span>
                      <span className="text-[10px] text-gray-500">{d.distanceToUni}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs mb-2">
                  <span className={`px-2 py-0.5 rounded-full ${d.mealIncluded ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {d.mealIncluded ? 'Yemek Dahil' : 'Yemek Hariç'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600 font-semibold">{d.priceRange}/ay</span>
                  <span className="text-gray-500">⭐ {d.rating}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500 border-t border-gray-100 pt-1">
                  {d.transport.type} • {d.transport.transfers} aktarma • {d.transport.duration}
                </div>
                <button
                  onClick={() => openDormDetail(d)}
                  className="mt-2 w-full bg-blue-600 text-white py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                >
                  Detaylar →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* POI Markers */}
        {filteredPois.map((poi) => (
          <Marker 
            key={`${poi.id}-${currentZoom}`} 
            position={poi.coords} 
            icon={makePill(poi.emoji, poi.label, poi.color, currentZoom)}
            eventHandlers={{
              click: () => handlePOIClick(poi),
            }}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-medium">{poi.label}</div>
                <button
                  onClick={() => handlePOIClick(poi)}
                  className="text-blue-500 hover:text-blue-700 text-xs mt-1 inline-block font-medium"
                >
                  Detayları Gör →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapZoomHandler />
        
        {/* Pinned Location Marker - Seçili konum sabit kalır */}
        {pinnedLocation && (
          <Marker 
            position={pinnedLocation.coords}
            icon={L.divIcon({
              className: '',
              html: `<div style="
                background: ${pinnedLocation.type === 'uni' ? '#1e40af' : pinnedLocation.type === 'dorm' ? '#DC2626' : '#F59E0B'};
                border: 3px solid white;
                border-radius: 50%;
                width: 44px;
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 0 0 4px rgba(255,255,255,0.5);
                cursor: pointer;
                font-size: 20px;
                animation: pulse 2s infinite;
              ">📍</div>
              <div style="
                position: absolute;
                bottom: -22px;
                left: 50%;
                transform: translateX(-50%);
                background: ${pinnedLocation.type === 'uni' ? '#1e40af' : pinnedLocation.type === 'dorm' ? '#DC2626' : '#F59E0B'};
                color: white;
                padding: 3px 10px;
                border-radius: 12px;
                font-size: 10px;
                font-weight: 600;
                white-space: nowrap;
              ">Sabitlendi</div>`,
              iconSize: [44, 60],
              iconAnchor: [22, 30]
            })}
          />
        )}
      </MapContainer>

      {/* POI Detail Panel - Google Maps Style */}
      {isPanelOpen && selectedPOI && (
        <div 
          className="fixed inset-0 z-[9998] bg-black/50"
          onClick={closePanel}
        />
      )}
      
      <div
        className={`fixed bottom-0 left-1/2 z-[9999] w-full max-w-[480px] -translate-x-1/2 overflow-hidden rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isPanelOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "75dvh" }}
      >
        {/* Handle */}
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-gray-300" />
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto" style={{ height: "calc(75dvh - 100px)" }}>
          {/* Hero Image Placeholder */}
          <div 
            className="mx-4 mt-3 h-40 rounded-2xl flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${selectedPOI?.color || '#3B82F6'}20 0%, ${selectedPOI?.color || '#3B82F6'}40 100%)`,
              border: `2px dashed ${selectedPOI?.color || '#3B82F6'}60`
            }}
          >
            <span className="text-6xl">{selectedPOI?.emoji}</span>
          </div>

          {/* Title Section */}
          <div className="px-5 pt-4">
            <h2 className="text-[22px] font-semibold text-gray-900 leading-tight">
              {selectedPOI?.label}
            </h2>
            
            {/* Category & Rating */}
            <div className="flex items-center gap-2 mt-2">
              <span 
                className="text-[13px] font-medium px-2.5 py-1 rounded-full"
                style={{ 
                  backgroundColor: (selectedPOI?.color || '#3B82F6') + '15',
                  color: selectedPOI?.color || '#3B82F6'
                }}
              >
                {subFilters.find(f => f.id === selectedPOI?.category)?.label}
              </span>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-semibold text-gray-700">{selectedPOI?.studentRating || 0}</span>
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <svg 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i <= Math.round(selectedPOI?.studentRating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[12px] text-gray-500">({selectedPOI?.totalVotes || 0})</span>
              </div>
            </div>

            {selectedPOI?.description && (
              <p className="text-[14px] text-gray-600 mt-3 leading-relaxed">
                {selectedPOI.description}
              </p>
            )}
          </div>

          {/* Action Buttons - Horizontal */}
          <div className="flex gap-3 px-5 mt-5 flex-wrap">
            <button
              onClick={() => selectedPOI && openInGoogleMaps(selectedPOI.coords, selectedPOI.label)}
              className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white rounded-full py-3 text-[14px] font-medium shadow-lg shadow-purple-200 active:scale-95 transition-transform min-w-[100px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Konum
            </button>
            <a
              href={selectedPOI ? `https://www.google.com/maps/dir/?api=1&destination=${selectedPOI.coords[0]},${selectedPOI.coords[1]}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-full py-3 text-[14px] font-medium shadow-lg shadow-blue-200 active:scale-95 transition-transform min-w-[100px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Yol Tarifi
            </a>
            {/* 📌 Sabitle Butonu */}
            <button
              onClick={() => {
                if (selectedPOI) {
                  if (pinnedLocation?.name === selectedPOI.label) {
                    unpinLocation();
                  } else {
                    pinLocation(selectedPOI.coords, selectedPOI.label, 'poi');
                  }
                }
              }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-full py-3 text-[14px] font-medium shadow-lg active:scale-95 transition-transform min-w-[100px] ${
                pinnedLocation?.name === selectedPOI?.label
                  ? 'bg-yellow-400 text-gray-900 shadow-yellow-200'
                  : 'bg-gray-600 text-white shadow-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill={pinnedLocation?.name === selectedPOI?.label ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {pinnedLocation?.name === selectedPOI?.label ? "Sabitlemeyi Kaldır" : "Sabitle"}
            </button>
            {selectedPOI?.phone && (
              <a
                href={`tel:${selectedPOI.phone?.replace(/\s/g, '')}`}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white rounded-full py-3 text-[14px] font-medium shadow-lg shadow-green-200 active:scale-95 transition-transform"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Ara
              </a>
            )}
          </div>

          {/* METRICS SECTION - Kategori Bazlı */}
          {selectedPOI?.metrics && selectedPOI.metrics.length > 0 && (
            <div className="px-5 mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-semibold text-gray-900">Öğrenci Metrikleri</h3>
                <span className="text-[12px] text-gray-500">{selectedPOI.totalVotes} oy</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {selectedPOI.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{metric.icon}</span>
                      <span className="text-[12px] font-medium text-gray-600">{metric.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
                        />
                      </div>
                      <span className="text-[13px] font-bold" style={{ color: metric.color }}>
                        {metric.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SON ÖDEMELER / PRICE HISTORY */}
          {selectedPOI?.priceHistory && selectedPOI.priceHistory.length > 0 && (
            <div className="px-5 mt-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">💸</span>
                  <h3 className="text-[15px] font-semibold">Son Ödenen Fiyatlar</h3>
                  <span className="text-[11px] text-gray-400 ml-auto">Gerçek öğrenci verisi</span>
                </div>
                <div className="space-y-3">
                  {selectedPOI.priceHistory.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                      <div className="flex-1">
                        <p className="text-[14px] font-medium">{item.service}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-gray-400">@{item.user}</span>
                          <span className="text-[10px] text-gray-500">• {item.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[18px] font-bold text-green-400">{item.price}{item.currency}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-3 text-center">
                  Son 3 öğrencinin ödediği tutar • Güncel fiyatlar için arayın
                </p>
              </div>
            </div>
          )}

          {/* STUDENT RATING BAR */}
          <div className="px-5 mt-5">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] opacity-90">Öğrenci Puanı</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-[28px] font-bold">{selectedPOI?.studentRating || 0}</span>
                    <span className="text-[14px] opacity-80">/ 5</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i <= Math.round(selectedPOI?.studentRating || 0) ? 'text-white fill-current' : 'text-white/30'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-[11px] mt-2 opacity-80">
                {selectedPOI?.totalVotes} öğrenci değerlendirmesi
              </p>
            </div>
          </div>

          {/* SUGGESTIONS / ÖNERİLER */}
          <div className="px-5 mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-semibold text-gray-900">Öğrenci Önerileri</h3>
              <button 
                onClick={() => alert('Öneri ekleme yakında!')}
                className="text-[13px] font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Öneri Ekle
              </button>
            </div>
            
            {selectedPOI?.suggestions && selectedPOI.suggestions.length > 0 ? (
              <div className="space-y-4">
                {selectedPOI.suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="bg-gray-50 rounded-xl p-4">
                    {/* Author & Rating */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[12px] font-medium">
                          {suggestion.avatar}
                        </div>
                        <span className="text-[13px] font-medium text-gray-900">{suggestion.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map(i => (
                          <svg 
                            key={i} 
                            className={`w-3 h-3 ${i <= suggestion.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <p className="text-[13px] text-gray-700 leading-relaxed mb-3">
                      {suggestion.content}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {suggestion.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-[10px] font-medium px-2 py-1 rounded-full bg-white text-gray-600 border border-gray-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      <span>{suggestion.date}</span>
                      <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {suggestion.likes} faydalı
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl">
                <span className="text-3xl">💭</span>
                <p className="text-[14px] text-gray-600 mt-2">Henüz öneri yok</p>
                <p className="text-[12px] text-gray-500 mt-1">İlk öneriyi sen ekle!</p>
              </div>
            )}
          </div>

          {/* INFO CARDS */}
          <div className="px-5 mt-6 pt-6 border-t border-gray-100 space-y-3">
            {selectedPOI?.address && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-[12px] text-gray-500 uppercase tracking-wide">Adres</p>
                  <p className="text-[14px] text-gray-900 font-medium mt-0.5">{selectedPOI.address}</p>
                  <p className="text-[12px] text-gray-400 mt-0.5">Sancaktepe, İstanbul</p>
                </div>
              </div>
            )}
            
            {selectedPOI?.hours && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-[12px] text-gray-500 uppercase tracking-wide">Çalışma Saatleri</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-[14px] text-gray-900 font-medium">Açık</span>
                    <span className="text-[13px] text-gray-500">• {selectedPOI.hours}</span>
                  </div>
                </div>
              </div>
            )}
            
            {selectedPOI?.phone && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-[12px] text-gray-500 uppercase tracking-wide">Telefon</p>
                  <a 
                    href={`tel:${selectedPOI.phone?.replace(/\s/g, '')}`}
                    className="text-[14px] text-gray-900 font-medium hover:text-blue-600 mt-0.5 block"
                  >
                    {selectedPOI.phone}
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="h-24"></div>
        </div>

        {/* Fixed Bottom Bar with Close */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-3 flex items-center justify-between">
          <button
            onClick={closePanel}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-[14px] font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            Kapat
          </button>
          <button 
            onClick={() => alert('Kaydedildi!')}
            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-[14px] font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Kaydet
          </button>
        </div>
      </div>

      {/* UNIVERSITY PANEL - Full Screen Detailed */}
      {isUniversityPanelOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm"
            onClick={closeUniversityPanel}
          />
          
          {/* Panel */}
          <div className="fixed inset-x-0 top-0 bottom-0 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl md:top-4 md:bottom-4 z-[10001] bg-white md:rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Header - Blue Gradient */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-700 text-white p-6 relative overflow-hidden shrink-0">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              {/* Close Button & Pin */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                {/* 📌 Sabitle Butonu */}
                <button 
                  onClick={() => {
                    if (pinnedLocation?.name === universityInfo.name) {
                      unpinLocation();
                    } else {
                      pinLocation(uni, universityInfo.name, 'uni');
                    }
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    pinnedLocation?.name === universityInfo.name 
                      ? 'bg-yellow-400 text-gray-900' 
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                  title={pinnedLocation?.name === universityInfo.name ? "Sabitlemeyi Kaldır" : "Haritada Sabitle"}
                >
                  <svg className="w-5 h-5" fill={pinnedLocation?.name === universityInfo.name ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button 
                  onClick={closeUniversityPanel}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* University Badge */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-4xl">🎓</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-500/30 px-3 py-1 rounded-full text-xs font-medium">
                        {universityInfo.type}
                      </span>
                      <span className="bg-green-500/30 px-3 py-1 rounded-full text-xs font-medium">
                        Kuruluş {universityInfo.founded}
                      </span>
                    </div>
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold mb-1">{universityInfo.name}</h1>
                <p className="text-blue-100 text-lg">{universityInfo.campus}</p>
              </div>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Quick Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{universityInfo.students.total.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Toplam Öğrenci</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{universityInfo.academic.faculties}</div>
                  <div className="text-sm text-gray-500">Fakülte</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{universityInfo.programs.total}</div>
                  <div className="text-sm text-gray-500">Program</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">#{universityInfo.rankings.urap}</div>
                  <div className="text-sm text-gray-500">URAP Sıralama</div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="p-6 space-y-6">
                {/* Quick Facts */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">✨</span> Hızlı Bilgiler
                  </h3>
                  <ul className="space-y-2">
                    {universityInfo.quickFacts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column - Academic */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <span>📚</span> Akademik Yapı
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Fakülte</span>
                        <span className="font-semibold">{universityInfo.academic.faculties}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Enstitü</span>
                        <span className="font-semibold">{universityInfo.academic.institutes}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Meslek Yüksekokulu</span>
                        <span className="font-semibold">{universityInfo.academic.vocationalSchools}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Araştırma Merkezi</span>
                        <span className="font-semibold">{universityInfo.academic.researchCenters}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Profesör</span>
                        <span className="font-semibold">{universityInfo.academic.professors}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Öğretim Görevlisi</span>
                        <span className="font-semibold">{universityInfo.academic.lecturers}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Programs & Facilities */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <span>🏆</span> Programlar & Akreditasyon
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Lisans Programı</span>
                        <span className="font-semibold">{universityInfo.programs.undergraduate}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Lisansüstü Program</span>
                        <span className="font-semibold">{universityInfo.programs.graduate}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">İngilizce Program</span>
                        <span className="font-semibold text-blue-600">{universityInfo.programs.english}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Akredite Program</span>
                        <span className="font-semibold text-green-600">{universityInfo.programs.accredited}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Araştırma Hastanesi</span>
                        <span className="font-semibold">{universityInfo.facilities.hospitals}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Araştırma Laboratuvarı</span>
                        <span className="font-semibold">{universityInfo.facilities.researchLabs}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Student Distribution */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>👥</span> Öğrenci Dağılımı
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                      <div className="text-xl font-bold text-blue-600">{universityInfo.students.undergraduate.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Lisans</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                      <div className="text-xl font-bold text-purple-600">{universityInfo.students.graduate.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Lisansüstü</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                      <div className="text-xl font-bold text-green-600">{universityInfo.students.international.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Uluslararası</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                      <div className="text-xl font-bold text-orange-600">{universityInfo.facilities.dormCapacity.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Yurt Kapasitesi</div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-4">
                  <a 
                    href={universityInfo.contact.yokAkademikUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white py-3 px-2 rounded-xl text-center hover:bg-red-700 transition-colors flex flex-col items-center gap-1"
                  >
                    <span className="text-lg">📊</span>
                    <span className="text-[10px] font-medium">YÖKAKADEMİK</span>
                  </a>
                  <a 
                    href={universityInfo.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white py-3 px-2 rounded-xl text-center hover:bg-blue-700 transition-colors flex flex-col items-center gap-1"
                  >
                    <span className="text-lg">🌐</span>
                    <span className="text-[10px] font-medium">Web</span>
                  </a>
                  <a 
                    href={`tel:${universityInfo.contact.phone.replace(/\s/g, '')}`}
                    className="bg-green-600 text-white py-3 px-2 rounded-xl text-center hover:bg-green-700 transition-colors flex flex-col items-center gap-1"
                  >
                    <span className="text-lg">📞</span>
                    <span className="text-[10px] font-medium">Ara</span>
                  </a>
                  <button 
                    onClick={() => openInGoogleMaps(uni, universityInfo.name)}
                    className="bg-purple-600 text-white py-3 px-2 rounded-xl text-center hover:bg-purple-700 transition-colors flex flex-col items-center gap-1"
                  >
                    <span className="text-lg">📍</span>
                    <span className="text-[10px] font-medium">Konum</span>
                  </button>
                  <button 
                    onClick={() => {
                      setActiveMainCategory('yurtlar');
                      activateDormsCategory();
                      openDormsPanel();
                    }}
                    className="bg-orange-500 text-white py-3 px-2 rounded-xl text-center hover:bg-orange-600 transition-colors flex flex-col items-center gap-1"
                  >
                    <span className="text-lg">🏠</span>
                    <span className="text-[10px] font-medium">Yakındaki Yurtlar</span>
                  </button>
                </div>
                
                {/* Contact Info */}
                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Rektör:</span> {universityInfo.rector}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{universityInfo.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* DORMS LIST PANEL */}
      {showDormsPanel && (
        <>
          <div 
            className="fixed inset-0 z-[10002] bg-black/60 backdrop-blur-sm"
            onClick={closeDormsPanel}
          />
          <div className="fixed inset-x-0 bottom-0 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl md:bottom-4 z-[10003] bg-white md:rounded-3xl overflow-hidden shadow-2xl flex flex-col" style={{ height: '85dvh' }}>
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">🏠 Yakındaki Yurtlar</h2>
                  <p className="text-orange-100 text-sm">Medipol Kavacık Kampüsü çevresinde</p>
                </div>
                <button 
                  onClick={closeDormsPanel}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Gender Filter & Map View */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setDormFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      dormFilter === 'all' 
                        ? 'bg-white text-orange-600' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    Tümü
                  </button>
                  <button
                    onClick={() => setDormFilter('erkek')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                      dormFilter === 'erkek' 
                        ? 'bg-white text-blue-600' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <span>👨</span> Erkek
                  </button>
                  <button
                    onClick={() => setDormFilter('kiz')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                      dormFilter === 'kiz' 
                        ? 'bg-white text-pink-600' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <span>👩</span> Kız
                  </button>
                </div>
                
                {/* Haritada Gör Butonu */}
                <button
                  onClick={() => {
                    toggleDormsOnMap();
                    closeDormsPanel();
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                    showDormsOnMap
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-orange-600 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  {showDormsOnMap ? 'Haritada Gizle' : 'Haritada Gör'}
                </button>
              </div>
            </div>
            
            {/* Dorms List */}
            <div className="flex-1 overflow-y-auto p-4">
              {dorms
                .filter(d => dormFilter === 'all' || d.gender === dormFilter)
                .sort((a, b) => parseFloat(a.distanceToUni) - parseFloat(b.distanceToUni))
                .map((dorm) => (
                <div 
                  key={dorm.id}
                  onClick={() => zoomToDorm(dorm, false)}
                  className="bg-white border border-gray-200 rounded-xl p-4 mb-3 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ backgroundColor: dorm.type === 'kyk' ? '#FEE2E2' : '#DBEAFE' }}
                    >
                      {dorm.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900 truncate">{dorm.name}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          dorm.type === 'kyk' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {dorm.type === 'kyk' ? 'KYK' : 'ÖZEL'}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          dorm.gender === 'erkek'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-pink-100 text-pink-700'
                        }`}>
                          {dorm.gender === 'erkek' ? 'Erkek' : 'Kız'}
                        </span>
                        {/* Becayiş Bekleyenler Badge - Sadece KYK */}
                        {dorm.type === 'kyk' && dorm.exchangeRequests && dorm.exchangeRequests.length > 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-purple-100 text-purple-700 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            {dorm.exchangeRequests.length} Becayiş
                          </span>
                        )}
                      </div>
                      
                      {/* Distance & Rating */}
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {dorm.distanceToUni}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {dorm.rating}
                        </span>
                      </div>
                      
                      {/* Price & Meal */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-green-600 font-bold">{dorm.priceRange}/ay</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          dorm.mealIncluded 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {dorm.mealIncluded ? 'Yemek Dahil' : 'Yemek Hariç'}
                        </span>
                      </div>
                      
                      {/* Transport Info */}
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          <span>
                            {dorm.transport.type} • {dorm.transport.transfers} aktarma • {dorm.transport.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* DORM DETAIL PANEL */}
      {isDormDetailOpen && selectedDorm && (
        <>
          <div 
            className="fixed inset-0 z-[10004] bg-black/60 backdrop-blur-sm"
            onClick={closeDormDetail}
          />
          <div className="fixed inset-x-0 bottom-0 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg md:bottom-4 z-[10005] bg-white md:rounded-3xl overflow-hidden shadow-2xl flex flex-col" style={{ height: '80dvh' }}>
            {/* Header */}
            <div 
              className="p-5 shrink-0"
              style={{ backgroundColor: selectedDorm.type === 'kyk' ? '#DC2626' : '#2563EB' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                    {selectedDorm.emoji}
                  </div>
                  <div className="text-white">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/20`}>
                        {selectedDorm.type === 'kyk' ? 'KYK' : 'ÖZEL'}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/20`}>
                        {selectedDorm.gender === 'erkek' ? 'Erkek' : 'Kız'}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold mt-1">{selectedDorm.name}</h2>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* 📌 Sabitle Butonu */}
                  <button 
                    onClick={() => {
                      if (pinnedLocation?.name === selectedDorm.name) {
                        unpinLocation();
                      } else {
                        pinLocation(selectedDorm.coords, selectedDorm.name, 'dorm');
                      }
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      pinnedLocation?.name === selectedDorm.name 
                        ? 'bg-yellow-400 text-gray-900' 
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                    title={pinnedLocation?.name === selectedDorm.name ? "Sabitlemeyi Kaldır" : "Haritada Sabitle"}
                  >
                    <svg className="w-5 h-5" fill={pinnedLocation?.name === selectedDorm.name ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                  <button 
                    onClick={closeDormDetail}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="bg-white/10 rounded-lg p-2 text-center text-white">
                  <div className="text-lg font-bold">{selectedDorm.rating}</div>
                  <div className="text-[10px] opacity-80">Puan</div>
                </div>
                <div className="bg-white/10 rounded-lg p-2 text-center text-white">
                  <div className="text-lg font-bold">{selectedDorm.distanceToUni}</div>
                  <div className="text-[10px] opacity-80">Mesafe</div>
                </div>
                <div className="bg-white/10 rounded-lg p-2 text-center text-white">
                  <div className="text-lg font-bold">{selectedDorm.capacity}</div>
                  <div className="text-[10px] opacity-80">Kapasite</div>
                </div>
                <div className="bg-white/10 rounded-lg p-2 text-center text-white">
                  <div className="text-sm font-bold truncate">{selectedDorm.priceRange.split('-')[0]}</div>
                  <div className="text-[10px] opacity-80">Başlangıç</div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* Price & Meal Info */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-5 border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Aylık Ücret</p>
                    <p className="text-2xl font-bold text-green-700">{selectedDorm.priceRange} <span className="text-sm font-normal">/ ay</span></p>
                  </div>
                  <div className={`px-4 py-2 rounded-full ${
                    selectedDorm.mealIncluded 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    <span className="text-sm font-semibold">
                      {selectedDorm.mealIncluded ? '🍽️ Yemek Dahil' : '🍽️ Yemek Hariç'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Transport Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-5 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🚌</span> Okula Ulaşım
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="bg-white rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-blue-600">{selectedDorm.transport.type}</p>
                    <p className="text-xs text-gray-500">Araç</p>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-blue-600">{selectedDorm.transport.transfers}</p>
                    <p className="text-xs text-gray-500">Aktarma</p>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-blue-600">{selectedDorm.transport.duration}</p>
                    <p className="text-xs text-gray-500">Süre</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 bg-white/50 p-2 rounded-lg">
                  <span className="font-medium">Detay:</span> {selectedDorm.transport.details}
                </p>
              </div>
              
              {/* Becayiş Bekleyenler - Sadece KYK Yurtları İçin */}
              {selectedDorm.type === 'kyk' && selectedDorm.exchangeRequests && selectedDorm.exchangeRequests.length > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-5 border border-purple-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Becayiş Bekleyenler ({selectedDorm.exchangeRequests.length} kişi)
                  </h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {selectedDorm.exchangeRequests.map((request) => (
                      <div key={request.id} className="bg-white rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm text-gray-900">{request.name}</p>
                          <p className="text-xs text-gray-500">{request.currentDorm}'dan</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                          <span className="text-xs font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
                            {request.targetSchool}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Facilities */}
              <div className="mb-5">
                <h3 className="font-semibold text-gray-900 mb-3">🛠️ Olanaklar</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDorm.facilities.map((facility, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Reviews */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">💬 Öğrenci Yorumları ({selectedDorm.reviewCount})</h3>
                <div className="space-y-3">
                  {selectedDorm.reviews.map((review, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {review.author.charAt(0)}
                          </div>
                          <span className="font-medium text-sm">{review.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(i => (
                            <svg key={i} className={`w-4 h-4 ${i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      {review.roomType && (
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{review.roomType}</span>
                          {review.pricePaid && <span className="text-green-600 font-medium">{review.pricePaid}</span>}
                        </div>
                      )}
                      <p className="text-gray-700 text-sm">{review.comment}</p>
                      <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Footer Actions */}
            <div className="border-t border-gray-100 p-4 flex gap-3">
              {selectedDorm.phone && (
                <a 
                  href={`tel:${selectedDorm.phone.replace(/\s/g, '')}`}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl text-center font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Ara
                </a>
              )}
              <button 
                onClick={() => selectedDorm && openInGoogleMaps(selectedDorm.coords, selectedDorm.name)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-center font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Konum
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
