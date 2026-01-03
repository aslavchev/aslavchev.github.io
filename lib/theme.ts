/**
 * Theme Configuration - Single Source of Truth
 * All colors, spacing, typography defined here
 */

export const theme = {
  colors: {
    light: {
      background: 'oklch(0.99 0 0)',
      foreground: 'oklch(0.15 0 0)',
      card: 'oklch(0.98 0 0)',
      cardForeground: 'oklch(0.15 0 0)',
      primary: 'oklch(0.518 0.147 191.02)',
      primaryForeground: 'oklch(0.99 0 0)',
      secondary: 'oklch(0.96 0.005 240)',
      secondaryForeground: 'oklch(0.15 0 0)',
      muted: 'oklch(0.955 0.008 240)',
      mutedForeground: 'oklch(0.435 0.012 240)',
      accent: 'oklch(0.48 0.155 188.75)',
      accentForeground: 'oklch(0.99 0 0)',
      border: 'oklch(0.90 0.005 240)',
      input: 'oklch(0.90 0.005 240)',
      ring: 'oklch(0.518 0.147 191.02)',
    },
    dark: {
      background: 'oklch(0.10 0.005 240)',
      foreground: 'oklch(0.95 0.008 240)',
      card: 'oklch(0.12 0.006 240)',
      cardForeground: 'oklch(0.95 0.008 240)',
      primary: 'oklch(0.518 0.147 191.02)',
      primaryForeground: 'oklch(0.10 0.005 240)',
      secondary: 'oklch(0.14 0.008 240)',
      secondaryForeground: 'oklch(0.95 0.008 240)',
      muted: 'oklch(0.16 0.008 240)',
      mutedForeground: 'oklch(0.46 0.012 240)',
      accent: 'oklch(0.48 0.155 188.75)',
      accentForeground: 'oklch(0.95 0.008 240)',
      border: 'oklch(0.18 0.008 240)',
      input: 'oklch(0.18 0.008 240)',
      ring: 'oklch(0.518 0.147 191.02)',
    },
  },
} as const

export type Theme = typeof theme
export type ThemeMode = 'light' | 'dark'
