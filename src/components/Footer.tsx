import { ChevronDown, Compass, Info } from 'lucide-react'
import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/brunodallier/', Icon: FaInstagram },
  { label: 'X', href: 'https://x.com/Alienigena404', Icon: FaXTwitter },
  { label: 'TikTok', href: 'https://www.tiktok.com/@alienigena404', Icon: FaTiktok },
  { label: 'YouTube', href: 'https://www.youtube.com/@brunodallieroficial', Icon: FaYoutube },
]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <Link className="footer-brand" to="/"><Compass size={18} />Renda Extra <span>com Bruno Dallier</span></Link>
          <p className="footer-copy">Guias práticos sobre renda extra em casa usando o celular e treinamento de inteligência artificial. Aprenda a usar a Hub, encontrar tarefas residenciais e comerciais, gravar corretamente e receber pagamentos via Pix.</p>
        </div>
          <div className="footer-tools">
          <div className="footer-socials">
            <p>Siga o Bruno</p>
            <nav aria-label="Redes sociais do Bruno Dallier">
              {socialLinks.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} data-tooltip={label}><Icon aria-hidden="true" /></a>
              ))}
              </nav>
            </div>
            <nav className="footer-legal" aria-label="Links legais">
              <Link to="/privacidade">Política de Privacidade</Link>
              <Link to="/termos">Termos de Uso</Link>
            </nav>
          </div>
        <details className="footer-disclaimer">
          <summary><Info size={17} aria-hidden="true" /><span>Aviso importante</span><ChevronDown size={16} aria-hidden="true" /></summary>
          <div className="footer-disclaimer__body">
            <p>O Renda Extra com Bruno Dallier é um site independente e informativo. Não somos a Hub Data e não operamos a plataforma Hub. Não realizamos cadastros, não disponibilizamos tarefas, não aprovamos gravações, não administramos contas e não processamos pagamentos.</p>
            <p>Tarefas, requisitos, aparelhos compatíveis, aplicativos, valores, bônus, campanhas, prazos, critérios de aprovação e formas de pagamento são definidos pela plataforma externa e podem mudar a qualquer momento.</p>
            <p>O conteúdo deste site não constitui oferta de emprego nem promessa de renda. Não garantimos disponibilidade de tarefas, aprovação de trabalhos, continuidade das oportunidades, valores de ganhos ou pagamentos por tarefas.</p>
            <p>Não recomendamos, em nenhuma hipótese, a compra de celular, equipamento ou qualquer outro produto exclusivamente para participar dessas atividades. Antes de assumir qualquer despesa, verifique as condições e a compatibilidade diretamente nos canais oficiais da plataforma.</p>
            <p>Todo o nosso conteúdo é gratuito. Não vendemos cursos, mentorias, treinamentos pagos ou acesso às tarefas. Alguns links deste site são links de indicação e podemos receber remuneração por cadastros ou ações qualificadas, sem que isso nos dê controle sobre as condições oferecidas pela plataforma.</p>
          </div>
        </details>
      </div>
      <div className="container footer-bottom"><span>© 2026 Renda Extra com Bruno Dallier</span></div>
    </footer>
  )
}
