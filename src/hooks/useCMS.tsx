import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent, Language } from '../types';
import { defaultContent } from '../data/defaultContent';

interface CMSContextType {
  content: SiteContent;
  language: Language;
  setLanguage: (lang: Language) => void;
  updateContent: (updates: Partial<SiteContent>) => void;
  t: (obj: { en: string; it: string }) => string;
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const STORAGE_KEY = 'marinepro_cms_content';
const ADMIN_KEY = 'marinepro_admin';

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('marinepro_lang') as Language) || 'en';
  });

  const [isAdmin, setIsAdminState] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('marinepro_lang', language);
  }, [language]);

  const setIsAdmin = (v: boolean) => {
    setIsAdminState(v);
    localStorage.setItem(ADMIN_KEY, String(v));
  };

  const updateContent = (updates: Partial<SiteContent>) => {
    setContent(prev => ({ ...prev, ...updates }));
  };

  const t = (obj: { en: string; it: string }) => obj[language] || obj.en;

  return (
    <CMSContext.Provider value={{ content, language, setLanguage, updateContent, t, isAdmin, setIsAdmin }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used within CMSProvider');
  return ctx;
}
