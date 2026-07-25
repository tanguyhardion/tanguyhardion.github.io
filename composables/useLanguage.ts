import { useState, onMounted } from '#imports';
import type { Language, TranslationStrings } from '~/types/portfolio';
import { translations } from '~/data/portfolioData';

export const useLanguage = () => {
  const currentLang = useState<Language>('portfolio_lang', () => 'en');

  const setLanguage = (lang: Language) => {
    currentLang.value = lang;
    if (import.meta.client) {
      localStorage.setItem('portfolio_language', lang);
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    setLanguage(currentLang.value === 'en' ? 'fr' : 'en');
  };

  const t = computed<TranslationStrings>(() => translations[currentLang.value]);

  const initLanguage = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('portfolio_language') as Language | null;
      if (saved && (saved === 'en' || saved === 'fr')) {
        currentLang.value = saved;
      } else {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('fr')) {
          currentLang.value = 'fr';
        } else {
          currentLang.value = 'en';
        }
      }
      document.documentElement.lang = currentLang.value;
    }
  };

  return {
    currentLang,
    setLanguage,
    toggleLanguage,
    initLanguage,
    t
  };
};
