import { ArrowRight, CircleAlert, Play } from 'lucide-react'
import { hubConfig } from '../data/hub'

type HubActionProps = {
  href: string | null
  label: string
  variant: 'primary' | 'secondary' | 'minute' | 'capture'
  icon?: 'arrow' | 'play'
  onUnavailable: (label: string) => void
}

function HubAction({ href, label, variant, icon = 'arrow', onUnavailable }: HubActionProps) {
  const iconElement = icon === 'play' ? <Play size={15} fill="currentColor" /> : <ArrowRight size={17} />
  const className = `hub-action hub-action--${variant}`

  if (href) {
    return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{label} {iconElement}</a>
  }

  return (
    <div className="hub-action-slot">
      <button className={className} type="button" onClick={() => onUnavailable(label)}>{label} {iconElement}</button>
      <span>Link em breve</span>
    </div>
  )
}

export function HubOrientation({ onLinkUnavailable }: { onLinkUnavailable: (label: string) => void }) {
  return (
    <section id="plataformas" className="hub-section" aria-labelledby="hub-title">
      <div className="container">
        <header className="hub-heading">
          <div>
            <p className="hub-heading__eyebrow">03 / Hub</p>
            <h2 id="hub-title">Comece pela<br />Hub.</h2>
            <p>Primeiro faça seu cadastro. Depois, descubra qual aplicativo usar no seu celular.</p>
          </div>
          <p className="hub-flow" aria-label="Cadastro, escolha do celular, aplicativo correto e tutorial">
            <span>Cadastro</span><b>→</b><span>Celular</span><b>→</b><span>Aplicativo</span><b>→</b><span>Tutorial</span>
          </p>
        </header>

        <div className="hub-steps">
          <article className="hub-step hub-registration">
            <p className="hub-step__label"><span>01</span> Passo 1</p>
            <h3>Crie sua conta na Hub</h3>
            <p className="hub-step__copy">O cadastro é o mesmo para todos. Faça isso antes de instalar qualquer aplicativo.</p>
            <HubAction href={hubConfig.registrationLink} label="Criar minha conta na Hub" variant="primary" onUnavailable={onLinkUnavailable} />
            <aside className="hub-notice">
              <CircleAlert size={17} aria-hidden="true" />
              <p><strong>Dica importante:</strong> se você já trabalha com outra plataforma parecida, use um novo e-mail no cadastro da Hub e no aplicativo.</p>
            </aside>
            <div className="hub-tutorial">
              <p><strong>Está com dúvida para se cadastrar?</strong><span>Veja o passo a passo completo.</span></p>
              <HubAction href={hubConfig.registrationTutorialLink} label="Assistir tutorial de cadastro" variant="secondary" icon="play" onUnavailable={onLinkUnavailable} />
            </div>
          </article>

          <div className="hub-step hub-choice">
            <div className="hub-choice__intro">
              <div>
                <p className="hub-step__label"><span>02</span> Passo 2</p>
                <h3>Qual celular você usa?</h3>
              </div>
            </div>

            <div className="phone-path-grid">
              <article className="phone-path phone-path--minute">
                <p className="phone-path__eyebrow">Você tem um destes celulares?</p>
                <ul>
                  {hubConfig.minuteCompatibleFamilies.map((family) => <li key={family}>{family}</li>)}
                </ul>
                <p className="phone-path__app-label">Seu aplicativo é:</p>
                <h4>Minute</h4>
                <p className="phone-path__copy">Use o Minute para realizar as tarefas compatíveis com esses aparelhos.</p>
                <div className="phone-path__actions">
                  <HubAction href={hubConfig.minuteAndroidLink} label="Baixar no Android" variant="minute" onUnavailable={onLinkUnavailable} />
                  <HubAction href={hubConfig.minuteIosLink} label="Baixar no iPhone" variant="minute" onUnavailable={onLinkUnavailable} />
                </div>
                <details className="compatibility-list">
                  <summary>Ver lista completa de modelos compatíveis</summary>
                  <p>A lista detalhada de modelos será adicionada aqui.</p>
                </details>
              </article>

              <article className="phone-path phone-path--capture">
                <p className="phone-path__eyebrow">Seu celular não está na lista acima?</p>
                <p className="phone-path__copy">A Hub também possui outro aplicativo compatível com outros modelos de celular.</p>
                <p className="phone-path__app-label">Seu aplicativo é:</p>
                <h4>Hub Capture</h4>
                <div className="phone-path__actions">
                  <HubAction href={hubConfig.hubCaptureAndroidLink} label="Baixar no Android" variant="capture" onUnavailable={onLinkUnavailable} />
                  <HubAction href={hubConfig.hubCaptureIosLink} label="Baixar no iPhone" variant="capture" onUnavailable={onLinkUnavailable} />
                </div>
                <details className="compatibility-list">
                  <summary>Ver celulares compatíveis</summary>
                  <p>Confirme a compatibilidade do seu modelo antes de seguir. A lista será preenchida aqui.</p>
                </details>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
