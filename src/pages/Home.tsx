import { ArrowDown, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import faqHeadmountMechanic from '../assets/faq-headmount-mechanic.png'
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
import { motionTokens, revealItem, revealSection, staggerReveal } from '../lib/motion'

const sectionViewport = { once: true, amount: 0.14 }

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
            <motion.div className="campaign-hero__copy reveal" variants={staggerReveal} initial="hidden" animate="visible">
              <motion.p variants={revealItem} transition={{ duration: motionTokens.duration.reveal, ease: motionTokens.easing.enter }}>01 / Treinamento + oportunidades</motion.p>
              <motion.h1 id="hero-title" variants={revealItem} transition={{ duration: motionTokens.duration.reveal, ease: motionTokens.easing.enter }}><span>Faça uma</span><span>renda extra</span><span>com</span><em>treinamento<br />de IA.</em></motion.h1>
              <motion.span variants={revealItem} transition={{ duration: motionTokens.duration.reveal, ease: motionTokens.easing.enter }}>Aprenda a encontrar oportunidades, fazer tarefas e buscar uma renda extra com IA.</motion.span>
              <motion.div className="campaign-hero__actions" variants={revealItem} transition={{ duration: motionTokens.duration.reveal, ease: motionTokens.easing.enter }}>
                <a className="button button--signal hero-registration-cta" href="https://ai.hub.xyz/r/SITEBR" target="_blank" rel="noopener noreferrer">Criar minha conta na Hub <ArrowRight size={18} /></a>
                <a className="button button--secondary" href="#plataformas">Ver oportunidades <ArrowRight size={18} /></a>
                <a className="text-link" href="#como-funciona">Como funciona <ArrowDown size={16} /></a>
              </motion.div>
            </motion.div>
            <motion.div variants={revealSection} initial="hidden" animate="visible"><IntroVideo video={introVideo} onUnavailable={() => setNotice('O vídeo de apresentação será conectado aqui quando estiver disponível.')} /></motion.div>
          </div>

          <motion.div className="hero-indicators" variants={staggerReveal} initial="hidden" animate="visible">
            <motion.div className="hero-indicator" variants={revealItem}><strong>R$ 10–30/h</strong><span>tarefas residenciais</span></motion.div>
            <motion.div className="hero-indicator" variants={revealItem}><strong>R$ 30–70/h</strong><span>tarefas comerciais</span></motion.div>
            <motion.div className="hero-indicator" variants={revealItem}><strong>PIX</strong><span>saque em reais</span></motion.div>
            <motion.div className="hero-indicator" variants={revealItem}><strong>COMECE DO ZERO</strong><span>não exige experiência prévia</span></motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section id="como-funciona" className="section journey-section" variants={revealSection} initial="hidden" whileInView="visible" viewport={sectionViewport}>
        <div className="container">
          <SectionHeading index="02" eyebrow="Como funciona" title="Entenda antes de começar." copy="Clique em uma etapa." />
          <JourneyExplorer steps={journeySteps} />
        </div>
      </motion.section>

      <HubOrientation onLinkUnavailable={(label) => setNotice(`${label}: link será adicionado aqui quando estiver disponível.`)} />

      <section id="tarefas" className="section tasks-section">
        <div className="container">
          <div className="tasks-heading"><p>05 / Tarefas</p><h2>Que tipo de tarefa<br />você pode fazer?</h2><span>Veja exemplos de tarefas disponíveis na Hub.</span></div>
          <TaskCarousel />
        </div>
      </section>

      <motion.section id="duvidas" className="section faq-section" variants={revealSection} initial="hidden" whileInView="visible" viewport={sectionViewport}>
        <div className="container faq-layout">
          <div className="faq-lead">
            <SectionHeading index="06" eyebrow="Perguntas frequentes" title="Tire suas dúvidas." copy="O essencial para começar com clareza." />
            <img className="faq-lead__image" src={faqHeadmountMechanic} alt="Homem usando suporte de cabeça enquanto limpa uma chave inglesa" />
          </div>
          <FAQList items={generalFaq} idPrefix="faq-geral" />
        </div>
      </motion.section>

      <motion.section id="tutoriais" className="section tutorials-section" variants={revealSection} initial="hidden" whileInView="visible" viewport={sectionViewport}>
        <div className="container">
          <div className="tutorials-heading"><p>07 / Tutoriais</p><h2>Aprenda fazendo.</h2><span>Veja os tutoriais e comece do jeito certo.</span></div>
          <motion.div className="tutorial-grid" variants={staggerReveal} initial="hidden" whileInView="visible" viewport={sectionViewport}>
            {homepageTutorials.map((tutorial) => <motion.div key={tutorial.id} variants={revealItem} transition={{ duration: motionTokens.duration.reveal, ease: motionTokens.easing.enter }}><TutorialCard tutorial={tutorial} /></motion.div>)}
          </motion.div>
        </div>
      </motion.section>

      <AnimatePresence>
        {notice ? <motion.div className="toast" role="status" initial={{ opacity: 0, scale: 0.96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 4 }} transition={{ duration: motionTokens.duration.component, ease: motionTokens.easing.enter }}><span>{notice}</span><button type="button" onClick={() => setNotice('')}>Fechar</button></motion.div> : null}
      </AnimatePresence>
    </main>
  )
}
