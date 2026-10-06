import { ArrowDown, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FAQList } from '../components/FAQList'
import { HubOrientation } from '../components/HubOrientation'
import { IntroVideo } from '../components/IntroVideo'
import { JourneyExplorer } from '../components/JourneyExplorer'
import { SectionHeading } from '../components/SectionHeading'
import { TaskCarousel } from '../components/TaskCarousel'
import { TutorialCard } from '../components/TutorialCard'
import { generalFaq } from '../data/faq'
import { journeySteps } from '../data/homeContent'
import { introVideo } from '../data/introVideo'
import { homepageTutorials } from '../data/tutorials'

export function Home() {
  const location = useLocation()
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!location.hash) return
    const target = document.querySelector(location.hash)
    window.requestAnimationFrame(() => target?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }, [location.hash])

  return (
    <main className="opportunities-home">
      <section className="campaign-hero campaign-hero--video" aria-labelledby="hero-title">
        <div className="container campaign-hero__inner">
          <div className="campaign-hero__grid">
            <div className="campaign-hero__copy reveal">
              <p>01 / Treinamento + oportunidades</p>
              <h1 id="hero-title"><span>Faça uma</span><span>renda extra</span><span>com</span><em>treinamento<br />de IA.</em></h1>
              <span>Aprenda a encontrar oportunidades, fazer tarefas e buscar uma renda extra com IA.</span>
              <div className="campaign-hero__actions">
                <a className="button button--signal" href="#plataformas">Ver oportunidades <ArrowRight size={18} /></a>
                <a className="text-link" href="#como-funciona">Como funciona <ArrowDown size={16} /></a>
              </div>
            </div>
            <IntroVideo video={introVideo} onUnavailable={() => setNotice('O vídeo de apresentação será conectado aqui quando estiver disponível.')} />
          </div>

          <div className="hero-indicators" aria-label="Indicadores de oportunidades">
            <div className="hero-indicator">
              <strong>R$ 10–30/h</strong>
              <span>tarefas residenciais</span>
            </div>
            <div className="hero-indicator">
              <strong>R$ 30–70/h</strong>
              <span>tarefas comerciais</span>
            </div>
            <div className="hero-indicator">
              <strong>PIX</strong>
              <span>saque em reais</span>
            </div>
            <div className="hero-indicator">
              <strong>COMECE DO ZERO</strong>
              <span>não exige experiência prévia</span>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="section journey-section">
        <div className="container">
          <SectionHeading index="02" eyebrow="Como funciona" title="Entenda antes de começar." copy="Clique em uma etapa." />
          <JourneyExplorer steps={journeySteps} />
        </div>
      </section>

      <HubOrientation onLinkUnavailable={(label) => setNotice(`${label}: link será adicionado aqui quando estiver disponível.`)} />

      <section id="tarefas" className="section tasks-section">
        <div className="container">
          <div className="tasks-heading"><p>05 / Tarefas</p><h2>Que tipo de tarefa<br />você pode fazer?</h2><span>Veja exemplos de tarefas disponíveis na Hub.</span></div>
          <TaskCarousel />
        </div>
      </section>

      <section id="duvidas" className="section faq-section">
        <div className="container faq-layout">
          <SectionHeading index="06" eyebrow="Perguntas frequentes" title="Tire suas dúvidas." copy="O essencial para começar com clareza." />
          <FAQList items={generalFaq} idPrefix="faq-geral" />
        </div>
      </section>

      <section id="tutoriais" className="section tutorials-section">
        <div className="container">
          <div className="tutorials-heading"><p>07 / Tutoriais</p><h2>Aprenda fazendo.</h2><span>Veja os tutoriais e comece do jeito certo.</span></div>
          <div className="tutorial-grid">
            {homepageTutorials.map((tutorial) => <TutorialCard key={tutorial.id} tutorial={tutorial} />)}
          </div>
        </div>
      </section>

      {notice ? <div className="toast" role="status"><span>{notice}</span><button type="button" onClick={() => setNotice('')}>Fechar</button></div> : null}
    </main>
  )
}
