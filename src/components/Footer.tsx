import { Compass, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="footer-brand" to="/"><Compass size={18} />Renda Extra <span>com Bruno Dallier</span></Link>
          <p>Uma central editorial para pesquisar oportunidades com critério, clareza e autonomia.</p>
        </div>
        <div className="footer-note"><ShieldCheck size={18} /><p>Dados demonstrativos neste protótipo. Antes de se cadastrar em qualquer serviço, confirme condições e pagamentos em canais oficiais.</p></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Renda Extra com Bruno Dallier</span><span>Informação antes de decisão</span></div>
    </footer>
  )
}
