/** Public art assets (Vite base-aware). */
const base = import.meta.env.BASE_URL

export const art = {
  hero: `${base}art/hero-scales.webp`,
  atmosphere: `${base}art/atmosphere.webp`,
  styleBase: `${base}art/style-base.webp`,
  /** Paper-field composition (no graph paper) */
  gridSystem: `${base}art/grid-system.webp`,
  composition: `${base}art/grid-system.webp`,
  tileCost: `${base}art/tile-cost.webp`,
  tileResolution: `${base}art/tile-resolution.webp`,
  tileTrust: `${base}art/tile-trust.webp`,
  og: `${base}art/og.jpg`,
  ogWebp: `${base}art/og.webp`,
} as const

/** Absolute site origin for Open Graph / Twitter (production GitHub Pages). */
export const siteOrigin = 'https://andrewhall07.github.io'
export const sitePath = '/ai-support-pricing-index/'
export const siteUrl = `${siteOrigin}${sitePath}`
export const ogImageAbsolute = `${siteOrigin}${sitePath}art/og.jpg`
