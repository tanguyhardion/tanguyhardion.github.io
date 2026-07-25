import { useState } from '#imports';

export type ThemeColorName = 'crimson' | 'gold' | 'orange' | 'light-blue' | 'purple' | 'neutral';

export interface ThemeColorSpec {
  name: ThemeColorName;
  hex: string;
  glowRgb: string;
}

export const themeColors: Record<ThemeColorName, ThemeColorSpec> = {
  crimson: {
    name: 'crimson',
    hex: '#FF3B5C',
    glowRgb: '255, 59, 92'
  },
  gold: {
    name: 'gold',
    hex: '#FFD700',
    glowRgb: '255, 215, 0'
  },
  orange: {
    name: 'orange',
    hex: '#FF7F50',
    glowRgb: '255, 127, 80'
  },
  'light-blue': {
    name: 'light-blue',
    hex: '#38BDF8',
    glowRgb: '56, 189, 248'
  },
  purple: {
    name: 'purple',
    hex: '#A855F7',
    glowRgb: '168, 85, 247'
  },
  neutral: {
    name: 'neutral',
    hex: '#757678',
    glowRgb: '117, 118, 120'
  }
};

export const routeThemeMap: Record<string, ThemeColorName> = {
  '/': 'crimson',
  '/academics': 'gold',
  '/experience': 'orange',
  '/projects': 'light-blue',
  '/skills': 'purple',
  '/more': 'neutral'
};

export const useBacklight = () => {
  const activeTheme = useState<ThemeColorSpec>('backlight_theme', () => themeColors.crimson);
  const mousePosition = useState<{ x: number; y: number }>('mouse_position', () => ({ x: -1000, y: -1000 }));

  const setThemeByRoute = (path: string) => {
    const matched = routeThemeMap[path] || 'neutral';
    activeTheme.value = themeColors[matched];
  };

  const updateMousePosition = (x: number, y: number) => {
    mousePosition.value = { x, y };
  };

  return {
    activeTheme,
    mousePosition,
    setThemeByRoute,
    updateMousePosition
  };
};
