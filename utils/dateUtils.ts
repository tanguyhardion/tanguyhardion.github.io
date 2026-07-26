import type { Language } from '~/types/portfolio';

const EN_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const FR_MONTHS = [
  'Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin',
  'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'
];

/**
 * Formats a month/year date string like "09/2024" or "10/2025" or "Present" into localized month string.
 * @param dateStr e.g. "09/2024" or "Present"
 * @param lang 'en' | 'fr'
 */
export function formatMonthYear(dateStr: string, lang: Language): string {
  const trimmed = dateStr.trim();
  if (!trimmed) return '';

  const lower = trimmed.toLowerCase();
  if (lower === 'present' || lower === 'présent' || lower === 'actuel') {
    return lang === 'fr' ? 'Présent' : 'Present';
  }

  // Check if string contains mm/yyyy pattern
  const parts = trimmed.split('/');
  if (parts.length === 2) {
    const monthNum = parseInt(parts[0], 10);
    const yearNum = parseInt(parts[1], 10);

    if (!isNaN(monthNum) && !isNaN(yearNum) && monthNum >= 1 && monthNum <= 12) {
      const monthName = lang === 'fr' ? FR_MONTHS[monthNum - 1] : EN_MONTHS[monthNum - 1];
      return `${monthName} ${yearNum}`;
    }
  }

  // Fallback if already formatted or single year
  return trimmed;
}

/**
 * Formats a period range string like "09/2024 - 01/2025" or "10/2025 - Present" into localized range.
 * @param period e.g. "09/2024 - 01/2025"
 * @param lang 'en' | 'fr'
 */
export function formatPeriod(period: string, lang: Language): string {
  if (!period) return '';
  const parts = period.split('-').map(p => p.trim());
  if (parts.length === 2) {
    const startFormatted = formatMonthYear(parts[0], lang);
    const endFormatted = formatMonthYear(parts[1], lang);
    return `${startFormatted} – ${endFormatted}`;
  }
  return formatMonthYear(period, lang);
}

/**
 * Parses a date string like "MM/YYYY" or "Present" into a Date object.
 * Returns current Date if "Present".
 */
export function parseMonthYear(dateStr: string): Date {
  const trimmed = dateStr.trim();
  const lower = trimmed.toLowerCase();
  if (lower === 'present' || lower === 'présent' || lower === 'actuel') {
    return new Date();
  }

  const parts = trimmed.split('/');
  if (parts.length === 2) {
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);
    if (!isNaN(month) && !isNaN(year)) {
      return new Date(year, month - 1, 1);
    }
  }

  // Fallback to year parsing if formatted as YYYY
  const yearOnly = parseInt(trimmed, 10);
  if (!isNaN(yearOnly)) {
    return new Date(yearOnly, 0, 1);
  }

  return new Date();
}

/**
 * Calculates total years of experience from experience items period strings (MM/YYYY - MM/YYYY or Present).
 * Takes into account exact month differences and active ranges.
 */
export function calculateYearsOfExperience(periods: string[]): string {
  if (!periods || periods.length === 0) return '1+';

  let minDate: Date | null = null;
  const now = new Date();

  for (const period of periods) {
    const parts = period.split('-').map(p => p.trim());
    if (parts.length >= 1) {
      const startDate = parseMonthYear(parts[0]);
      if (!minDate || startDate < minDate) {
        minDate = startDate;
      }
    }
  }

  if (!minDate) return '1+';

  // Calculate year difference taking months into account
  let diffYears = now.getFullYear() - minDate.getFullYear();
  let diffMonths = now.getMonth() - minDate.getMonth();

  if (diffMonths < 0) {
    diffYears -= 1;
    diffMonths += 12;
  }

  // Round/format nicely. If >= 1 year, return X+, otherwise if positive return 1+
  const totalYears = diffYears + (diffMonths >= 6 ? 0.5 : 0);
  const resultYears = Math.max(1, Math.floor(diffYears));

  return `${resultYears}+`;
}
