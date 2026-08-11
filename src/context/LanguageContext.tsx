import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (frVal: any, enVal?: any) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('yacouba_site_lang') as Language;
      if (saved && (saved === 'fr' || saved === 'en')) {
        setLanguageState(saved);
      }
    } catch {
      // Ignore local storage errors
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('yacouba_site_lang', lang);
    } catch {
      // Ignore local storage errors
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const t = (frVal: any, enVal?: any) => {
    if (frVal === undefined || frVal === null) {
      if (enVal !== undefined && enVal !== null) return enVal;
      return '';
    }
    // If enVal is omitted and frVal is an object like { fr: '...', en: '...' }
    if (enVal === undefined && typeof frVal === 'object' && !Array.isArray(frVal)) {
      const chosen = language === 'fr' ? (frVal.fr ?? frVal.en) : (frVal.en ?? frVal.fr);
      return chosen ?? '';
    }
    const chosen = language === 'fr' ? frVal : (enVal !== undefined ? enVal : frVal);
    return chosen ?? '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
