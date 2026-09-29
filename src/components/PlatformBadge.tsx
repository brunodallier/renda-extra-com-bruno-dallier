import type { Platform } from '../types/content'

export function PlatformBadge({ platform }: { platform: Pick<Platform, 'name' | 'monogram' | 'accent'> }) {
  return (
    <span className={`platform-badge platform-badge--${platform.accent}`} aria-label={platform.name}>
      {platform.monogram}
    </span>
  )
}
