import { ArrowDown, ArrowRight, CircleAlert, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import hubRegistrationWoman from '../assets/hub-registration-woman.png'
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
  const applicationSectionRef = useRef<HTMLElement>(null)
  const [isApplicationRevealed, setIsApplicationRevealed] = useState(false)

  useEffect(() => {
    const section = applicationSectionRef.current
    if (!section) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setIsApplicationRevealed(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsApplicationRevealed(true)
        observer.disconnect()
      }
    }, { threshold: 0.18 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section id="plataformas" className="hub-registration-section" aria-labelledby="hub-registration-title">
        <div className="container">
          <header className="hub-registration-section__header">
            <p>03 / Hub</p>
          </header>

          <div className="hub-registration-section__content">
            <div className="hub-registration-section__lead">
              <p className="hub-step__label"><span>01</span> Passo 1</p>
              <h2 id="hub-registration-title">Crie sua<br />conta na Hub</h2>
              <p><span>Comece por aqui: crie sua conta na Hub.</span><span>O cadastro é o mesmo para quem vai usar Minute ou Hub Capture.</span></p>
              <HubAction href={hubConfig.registrationLink} label="Criar minha conta na Hub" variant="primary" onUnavailable={onLinkUnavailable} />
              <aside className="hub-notice">
                <CircleAlert size={17} aria-hidden="true" />
                <p><strong>Dica importante:</strong> se você já trabalha com outra plataforma parecida, use um novo e-mail no cadastro da Hub e no aplicativo.</p>
              </aside>
              <div className="hub-tutorial">
                <p><strong>Prefere ver o passo a passo?</strong><span>Assista ao tutorial completo de cadastro.</span></p>
                <HubAction href={hubConfig.registrationTutorialLink} label="Ver tutorial de cadastro" variant="secondary" icon="play" onUnavailable={onLinkUnavailable} />
              </div>
            </div>

            <div className="hub-registration-portrait">
              <img src={hubRegistrationWoman} alt="Mulher usando suporte para celular" />
            </div>
          </div>

          <a className="hub-continue" href="#aplicativo">Cadastro feito? Continue <ArrowDown size={17} /></a>
        </div>
      </section>

      <section id="aplicativo" ref={applicationSectionRef} className={`hub-app-section ${isApplicationRevealed ? 'is-revealed' : ''}`} aria-labelledby="hub-app-title">
        <div className="container">
          <header className="hub-app-section__heading">
            <p className="hub-reveal hub-reveal--index">04 / Aplicativo</p>
            <div className="hub-app-section__title-block hub-reveal hub-reveal--title">
              <p className="hub-step__label"><span>02</span> Passo 2</p>
              <h2 id="hub-app-title">Qual celular<br />você usa?</h2>
              <p className="hub-app-section__subtitle">Escolha seu modelo e siga pelo aplicativo correto.</p>
            </div>
          </header>

          <div className="phone-path-grid hub-app-section__paths">
            <article className="phone-path phone-path--minute hub-reveal hub-reveal--minute">
              <p className="phone-path__eyebrow">Você usa um destes modelos?</p>
              <ul>
                {hubConfig.minuteCompatibleFamilies.map((family) => <li key={family}>{family}</li>)}
              </ul>
              <p className="phone-path__app-label">Seu aplicativo é:</p>
              <h4>Minute</h4>
              <p className="phone-path__copy">Use o Minute para realizar as tarefas compatíveis com esses aparelhos.</p>
              <div className="phone-path__actions">
                <HubAction href={hubConfig.minuteAndroidLink} label="Baixar Minute no Android" variant="minute" onUnavailable={onLinkUnavailable} />
                <HubAction href={hubConfig.minuteIosLink} label="Baixar Minute no iPhone" variant="minute" onUnavailable={onLinkUnavailable} />
              </div>
              <details className="compatibility-list">
                <summary>Ver lista completa de modelos compatíveis</summary>
                <p>A lista detalhada de modelos será adicionada aqui.</p>
              </details>
            </article>

            <article className="phone-path phone-path--capture hub-reveal hub-reveal--capture">
              <p className="phone-path__eyebrow">Seu celular não usa o Minute?</p>
              <p className="phone-path__copy">Então seu próximo caminho é o Hub Capture.</p>
              <p className="phone-path__app-label">Seu aplicativo é:</p>
              <h4>Hub Capture</h4>
              <div className="phone-path__actions">
                <HubAction href={hubConfig.hubCaptureAndroidLink} label="Baixar Hub Capture no Android" variant="capture" onUnavailable={onLinkUnavailable} />
                <HubAction href={hubConfig.hubCaptureIosLink} label="Baixar Hub Capture no iPhone" variant="capture" onUnavailable={onLinkUnavailable} />
              </div>
              <details className="compatibility-list">
                <summary>Ver celulares compatíveis</summary>
                <p>Confirme a compatibilidade do seu modelo antes de seguir. A lista será preenchida aqui.</p>
              </details>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
