import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Renda Extra com Bruno Dallier, página inicial">
      <span className="brand-mark"><Compass size={19} strokeWidth={2.2} /></span>
      <span className="brand__name">Renda Extra <span>com Bruno Dallier</span></span>
    </Link>
  )
}
