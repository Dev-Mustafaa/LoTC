export type ModuleId =
  | "ulasim"
  | "butce"
  | "saglik"
  | "ihtiyaclar"
  | "burslar"
  | "gelisim"
  | "ilkhafta"
  | "erisilebilirlik";

export const MODULE_TITLES: Record<ModuleId, string> = {
  ulasim: "Ulaşım",
  butce: "Bütçe",
  saglik: "Sağlık",
  ihtiyaclar: "İhtiyaçlar",
  burslar: "Burslar",
  gelisim: "Gelişim",
  ilkhafta: "İlk Hafta",
  erisilebilirlik: "Erişilebilirlik",
};
