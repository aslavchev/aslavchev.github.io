/**
 * Content Management System
 * Centralized text content with i18n support
 *
 * To add Spanish translation later:
 * 1. Create lib/content/es.ts with same structure as en.ts
 * 2. Update getCurrentLocale() to detect language
 * 3. Import and export Spanish content
 */

import { content as en, type Content } from './en'

// Future: import { content as es } from './es'

/**
 * Available locales
 * Add 'es' when Spanish translation is ready
 */
export type Locale = 'en' // | 'es'

/**
 * Get current locale
 * For now: always English
 * Later: detect from browser, URL, or user preference
 */
export function getCurrentLocale(): Locale {
  // Future: const browserLang = navigator.language.split('-')[0]
  // Future: return browserLang === 'es' ? 'es' : 'en'
  return 'en'
}

/**
 * Get content for specific locale
 */
export function getContent(locale: Locale = getCurrentLocale()): Content {
  const contentMap: Record<Locale, Content> = {
    en,
    // es, // Add when Spanish ready
  }

  return contentMap[locale] || en
}

/**
 * Default export: English content
 * Components can import: `import { content } from '@/lib/content'`
 */
export const content = getContent()

/**
 * Export type for TypeScript
 */
export type { Content }
