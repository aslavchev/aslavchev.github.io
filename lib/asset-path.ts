/**
 * Asset Path Utility
 * Prefixes public assets with basePath for GitHub Pages subdirectory deployment
 */

const BASE_PATH = '/aslavchev-portfolio-website'

/**
 * Get the correct asset path for images and files in /public
 * @param path - Path to asset (e.g., '/my-image.jpg')
 * @returns Full path with basePath prefix
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_PATH}/${cleanPath}`
}
