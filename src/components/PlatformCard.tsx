import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Platform } from '../types/content'
import { PlatformBadge } from './PlatformBadge'

export function PlatformCard({ platform }: { platform: Platform }) {
  return (
    <article className={`opportunity-card opportunity-card--${platform.accent}`}>
      <div className="opportunity-card__topline">
        <span>Oportunidade</span>
        <PlatformBadge platform={platform} />
        <span>{platform.status}</span>
      </div>
      <div className="opportunity-card__copy">
        <p>{platform.label}</p>
        <h3>{platform.name}</h3>
        <p>{platform.tagline}</p>
      </div>
      <div className="opportunity-pay">
        <span>Quanto paga</span>
        <strong>{platform.earning}</strong>
        <small>Valor demonstrativo</small>
      </div>
      <dl className="opportunity-facts">
        <div><dt>Pagamento</dt><dd>{platform.payment}</dd></div>
        <div><dt>Saque</dt><dd>{platform.withdrawalMinimum}</dd></div>
      </dl>
      <Link className="opportunity-link" to={`/plataformas/${platform.slug}`}>
        Tudo sobre {platform.name} <ArrowUpRight size={17} />
      </Link>
    </article>
  )
}
