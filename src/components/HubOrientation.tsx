import { ArrowDown, ArrowRight, Check, CircleAlert, Play, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import hubRegistrationWoman from '../assets/hub-registration-woman.png'
import { hubCaptureAcceptedDevices, hubCaptureRejectedDevices, hubConfig, minuteCompatibleModels, minuteInviteCodes } from '../data/hub'

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
  const [copiedInviteCode, setCopiedInviteCode] = useState<string | null>(null)

  const copyInviteCode = async (code: string) => {
    const copyWithFallback = () => {
      const input = document.createElement('textarea')
      input.value = code
      input.setAttribute('readonly', '')
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code)
      } else {
        copyWithFallback()
      }
    } catch {
      copyWithFallback()
    }

    setCopiedInviteCode(code)
    window.setTimeout(() => setCopiedInviteCode((current) => current === code ? null : current), 1600)
  }

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
              <div className="phone-path__top">
                <p className="phone-path__eyebrow">Você usa um destes modelos?</p>
                <ul>
                  {hubConfig.minuteCompatibleFamilies.map((family) => <li key={family}>{family}</li>)}
                </ul>
                <p className="phone-path__app-label">Seu aplicativo é:</p>
                <h4>Minute</h4>
                <p className="phone-path__copy">Use o Minute para realizar as tarefas compatíveis com esses aparelhos.</p>
              </div>
              <div className="phone-path__pre-download phone-path__pre-download--minute">
                <p className="pre-download-info__label">Antes de baixar</p>
                <p className="pre-download-info__title">Código de convite do app</p>
                <div className="invite-code-list">
                  {minuteInviteCodes.map(({ label, code }) => (
                    <div className="invite-code-row" key={code}>
                      <div><span>{label}</span><code>{code}</code></div>
                      <button type="button" onClick={() => void copyInviteCode(code)} aria-label={`Copiar código ${code}`}>{copiedInviteCode === code ? 'Copiado' : 'Copiar'}</button>
                    </div>
                  ))}
                </div>
                <p className="pre-download-info__copy">Use o código correspondente ao tipo de tarefa que você pretende realizar.</p>
              </div>
              <div className="phone-path__actions">
                <HubAction href={hubConfig.minuteAndroidLink} label="Baixar Minute no Android" variant="minute" onUnavailable={onLinkUnavailable} />
                <HubAction href={hubConfig.minuteIosLink} label="Baixar Minute no iPhone" variant="minute" onUnavailable={onLinkUnavailable} />
              </div>
              <details className="compatibility-list">
                <summary>Ver lista completa de modelos compatíveis</summary>
                <div className="compatibility-list__content compatibility-list__content--minute">
                  <div className="compatibility-list__brands">
                    {minuteCompatibleModels.map(({ manufacturer, models }) => (
                      <section key={manufacturer}>
                        <h5>{manufacturer}</h5>
                        <ul>{models.map((model) => <li key={model}><Check size={12} aria-hidden="true" />{model}</li>)}</ul>
                      </section>
                    ))}
                  </div>
                  <p className="compatibility-list__notice"><strong>Não compatíveis:</strong> iPhone 16e e iPhone 17e.</p>
                </div>
              </details>
            </article>

            <article className="phone-path phone-path--capture hub-reveal hub-reveal--capture">
              <div className="phone-path__top">
                <p className="phone-path__eyebrow">Seu celular não está nesta lista?</p>
                <p className="phone-path__app-label">Seu aplicativo é:</p>
                <h4>Hub Capture</h4>
              </div>
              <div className="phone-path__pre-download phone-path__pre-download--capture">
                <p className="pre-download-info__label">Antes de baixar</p>
                <p className="pre-download-info__title">É obrigatório criar sua conta na Hub primeiro.</p>
                <p className="pre-download-info__copy">Se você ainda não fez o cadastro, crie sua conta antes de instalar o aplicativo.</p>
                <a className="pre-download-info__registration-link" href={hubConfig.registrationLink} target="_blank" rel="noopener noreferrer">Criar conta na Hub <ArrowRight size={15} /></a>
              </div>
              <div className="phone-path__actions">
                <HubAction href={hubConfig.hubCaptureAndroidLink} label="Baixar Hub Capture no Android" variant="capture" onUnavailable={onLinkUnavailable} />
                <HubAction href={hubConfig.hubCaptureIosLink} label="Baixar Hub Capture no iPhone" variant="capture" onUnavailable={onLinkUnavailable} />
              </div>
              <details className="compatibility-list">
                <summary>Ver modelos já testados</summary>
                <div className="compatibility-list__content compatibility-list__content--capture">
                  <h5>Modelos que já testamos</h5>
                  <p className="compatibility-list__intro">Além dos aparelhos já compatíveis com o Minute, estes modelos também foram testados por nós e funcionaram com o Hub Capture.</p>
                  <div className="compatibility-list__brands compatibility-list__brands--capture">
                    {hubCaptureAcceptedDevices.map(({ manufacturer, models }) => (
                      <section key={manufacturer}>
                        <h6>{manufacturer}</h6>
                        <ul>{models.map((model) => <li key={model}><Check size={12} aria-hidden="true" />{model}</li>)}</ul>
                      </section>
                    ))}
                  </div>
                  <aside className="compatibility-list__rejected">
                    <strong>Não funcionou em nossos testes</strong>
                    {hubCaptureRejectedDevices.map(({ manufacturer, models }) => (
                      <div key={manufacturer}>
                        <span>{manufacturer}</span>
                        <ul>{models.map((model) => <li key={model}><X size={12} aria-hidden="true" />{model}</li>)}</ul>
                      </div>
                    ))}
                  </aside>
                  <aside className="compatibility-list__testing-notice">
                    <strong>Ainda em testes</strong>
                    <p>O Hub Capture continua sendo testado em novos aparelhos. A lista acima mostra modelos que já testamos e sabemos que funcionam. Outros celulares também podem ser compatíveis. Se o seu aparelho não estiver na lista, vale instalar o aplicativo e testar.</p>
                  </aside>
                </div>
              </details>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
