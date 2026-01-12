/**
 * Theme tokens for React Native
 * Converted from Tailwind CSS design system
 */

// HSL to RGB hex converter helper
const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const colors = {
  // Dark theme (default)
  dark: {
    background: hslToHex(222, 47, 11),        // #0f172a
    foreground: hslToHex(210, 40, 98),        // #f8fafc
    
    card: hslToHex(222, 47, 14),              // #1e293b
    cardForeground: hslToHex(210, 40, 98),    // #f8fafc
    
    popover: hslToHex(222, 47, 14),           // #1e293b
    popoverForeground: hslToHex(210, 40, 98), // #f8fafc
    
    primary: hslToHex(162, 72, 45),           // #22c55e (green)
    primaryForeground: hslToHex(222, 47, 11), // #0f172a
    
    secondary: hslToHex(215, 25, 20),         // #1e293b
    secondaryForeground: hslToHex(210, 40, 98), // #f8fafc
    
    muted: hslToHex(215, 25, 18),             // #1e293b
    mutedForeground: hslToHex(215, 20, 55),   // #64748b
    
    accent: hslToHex(162, 72, 45),            // #22c55e
    accentForeground: hslToHex(222, 47, 11),  // #0f172a
    
    destructive: hslToHex(0, 72, 60),         // #ef4444
    destructiveForeground: hslToHex(210, 40, 98), // #f8fafc
    
    success: hslToHex(162, 72, 45),           // #22c55e
    successForeground: hslToHex(222, 47, 11), // #0f172a
    
    warning: hslToHex(38, 92, 60),            // #f59e0b
    warningForeground: hslToHex(222, 47, 11), // #0f172a
    
    border: hslToHex(215, 25, 22),            // #334155
    input: hslToHex(215, 25, 22),             // #334155
    ring: hslToHex(162, 72, 45),              // #22c55e
    
    // Sidebar specific
    sidebar: hslToHex(222, 47, 9),            // #0c1322
    sidebarForeground: hslToHex(210, 40, 98), // #f8fafc
    sidebarPrimary: hslToHex(162, 72, 45),    // #22c55e
    sidebarAccent: hslToHex(215, 25, 15),     // #1e293b
    sidebarBorder: hslToHex(215, 25, 18),     // #1e293b
  },
  
  // Light theme
  light: {
    background: hslToHex(210, 40, 98),        // #f8fafc
    foreground: hslToHex(222, 47, 11),        // #0f172a
    
    card: '#ffffff',
    cardForeground: hslToHex(222, 47, 11),    // #0f172a
    
    popover: '#ffffff',
    popoverForeground: hslToHex(222, 47, 11), // #0f172a
    
    primary: hslToHex(162, 72, 40),           // #16a34a
    primaryForeground: '#ffffff',
    
    secondary: hslToHex(210, 40, 96),         // #f1f5f9
    secondaryForeground: hslToHex(222, 47, 11), // #0f172a
    
    muted: hslToHex(210, 40, 96),             // #f1f5f9
    mutedForeground: hslToHex(215, 20, 45),   // #64748b
    
    accent: hslToHex(210, 40, 96),            // #f1f5f9
    accentForeground: hslToHex(222, 47, 11),  // #0f172a
    
    destructive: hslToHex(0, 72, 55),         // #dc2626
    destructiveForeground: '#ffffff',
    
    success: hslToHex(162, 72, 40),           // #16a34a
    successForeground: '#ffffff',
    
    warning: hslToHex(38, 92, 55),            // #d97706
    warningForeground: hslToHex(222, 47, 11), // #0f172a
    
    border: hslToHex(214, 32, 91),            // #e2e8f0
    input: hslToHex(214, 32, 91),             // #e2e8f0
    ring: hslToHex(162, 72, 40),              // #16a34a
    
    // Sidebar specific
    sidebar: '#ffffff',
    sidebarForeground: hslToHex(222, 47, 11), // #0f172a
    sidebarPrimary: hslToHex(162, 72, 40),    // #16a34a
    sidebarAccent: hslToHex(210, 40, 96),     // #f1f5f9
    sidebarBorder: hslToHex(214, 32, 91),     // #e2e8f0
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

export const fontWeight = {
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const fontFamily = {
  sans: 'PlusJakartaSans-Regular',
  sansMedium: 'PlusJakartaSans-Medium',
  sansSemibold: 'PlusJakartaSans-SemiBold',
  sansBold: 'PlusJakartaSans-Bold',
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  }),
};

// Default to dark theme
export const theme = colors.dark;
