import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type AppContextType = {
  selectedSchool: string;
  selectedDistrict: string;
  setSelectedSchool: (s: string) => void;
  setSelectedDistrict: (d: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const SCHOOL_KEY = "selectedSchool";
const DISTRICT_KEY = "selectedDistrict";
const DEFAULT_SCHOOL = "Medipol Üniversitesi";
const DEFAULT_DISTRICT = "Sancaktepe";

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedSchool, setSelectedSchoolState] = useState<string>(DEFAULT_SCHOOL);
  const [selectedDistrict, setSelectedDistrictState] = useState<string>(DEFAULT_DISTRICT);

  useEffect(() => {
    try {
      const s = localStorage.getItem(SCHOOL_KEY);
      const d = localStorage.getItem(DISTRICT_KEY);
      if (s) setSelectedSchoolState(s);
      if (d) setSelectedDistrictState(d);
    } catch {
      // ignore
    }
  }, []);

  const setSelectedSchool = (s: string) => {
    setSelectedSchoolState(s);
    try {
      localStorage.setItem(SCHOOL_KEY, s);
    } catch {
      // ignore
    }
  };

  const setSelectedDistrict = (d: string) => {
    setSelectedDistrictState(d);
    try {
      localStorage.setItem(DISTRICT_KEY, d);
    } catch {
      // ignore
    }
  };

  return (
    <AppContext.Provider
      value={{ selectedSchool, selectedDistrict, setSelectedSchool, setSelectedDistrict }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
