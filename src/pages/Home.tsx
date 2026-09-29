import { ArrowDown, ArrowRight, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FAQList } from '../components/FAQList'
import { FilterBar } from '../components/FilterBar'
import { IntroVideo } from '../components/IntroVideo'
import { JourneyExplorer } from '../components/JourneyExplorer'
import { PlatformCard } from '../components/PlatformCard'
import { SectionHeading } from '../components/SectionHeading'
import { TaskCarousel } from '../components/TaskCarousel'
import { TutorialCard } from '../components/TutorialCard'
import { generalFaq } from '../data/faq'
import { journeySteps, taskExamples } from '../data/homeContent'
import { introVideo } from '../data/introVideo'
import { platforms } from '../data/platforms'
import { tutorialCategories, tutorials } from '../data/tutorials'
import type { FilterKey, Tutorial } from '../types/content'

export function Home() {
  const location = useLocation()
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!location.hash) return
    const target = document.querySelector(location.hash)
    window.requestAnimationFrame(() => target?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }, [location.hash])

  const visiblePlatforms = activeFilter === 'all'
    ? platforms
    : platforms.filter((platform) => platform.filters.includes(activeFilter))
  const visibleTutorials = activeCategory === 'Todos'
    ? tutorials
    : tutorials.filter((tutorial) => tutorial.category === activeCategory)

  const watchTutorial = (tutorial: Tutorial) => {
    setNotice(`“${tutorial.title}” está preparado para receber o link do vídeo.`)
  }

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
        </div>
      </section>

      <section id="como-funciona" className="section journey-section">
        <div className="container">
          <SectionHeading index="02" eyebrow="Como funciona" title="Entenda antes de começar." copy="Clique em uma etapa." />
          <JourneyExplorer steps={journeySteps} />
        </div>
      </section>

      <section id="plataformas" className="section platforms-section">
        <div className="container">
          <div className="opportunities-heading"><p>03 / Plataformas</p><h2>Veja as<br />plataformas.</h2><span><ShieldCheck size={16} />Valores demonstrativos</span></div>
          <FilterBar activeFilter={activeFilter} onChange={setActiveFilter} />
          <p className="results-count">{visiblePlatforms.length} {visiblePlatforms.length === 1 ? 'plataforma encontrada' : 'plataformas encontradas'}</p>
          <div className="platform-grid">
            {visiblePlatforms.map((platform) => <PlatformCard key={platform.slug} platform={platform} />)}
          </div>
        </div>
      </section>

      <section id="tarefas" className="section tasks-section">
        <div className="container">
          <div className="tasks-heading"><p>04 / Exemplos de tarefas</p><h2>Que tipo de<br />tarefa você<br />pode fazer?</h2><span>Use o seu tempo.</span></div>
          <TaskCarousel tasks={taskExamples} />
        </div>
      </section>

      <section id="duvidas" className="section faq-section">
        <div className="container faq-layout">
          <SectionHeading index="05" eyebrow="Perguntas rápidas" title="Antes de começar." copy="O essencial, sem enrolação." />
          <FAQList items={generalFaq} idPrefix="faq-geral" />
        </div>
      </section>

      <section id="tutoriais" className="section tutorials-section">
        <div className="container">
          <div className="tutorials-heading"><p>06 / Tutoriais</p><h2>Aprenda<br />fazendo.</h2><span>Veja como funciona.</span></div>
          <div className="category-tabs" role="tablist" aria-label="Categorias de vídeos">
            {['Todos', ...tutorialCategories].map((category) => (
              <button key={category} type="button" role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'is-active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>
            ))}
          </div>
          <div className="tutorial-grid">
            {visibleTutorials.map((tutorial) => <TutorialCard key={tutorial.id} tutorial={tutorial} onWatch={watchTutorial} />)}
          </div>
        </div>
      </section>

      {notice ? <div className="toast" role="status"><span>{notice}</span><button type="button" onClick={() => setNotice('')}>Fechar</button></div> : null}
    </main>
  )
}
