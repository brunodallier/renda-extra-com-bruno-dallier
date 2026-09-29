import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, CircleAlert, CirclePlay, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FAQList } from '../components/FAQList'
import { SectionHeading } from '../components/SectionHeading'
import { TutorialCard } from '../components/TutorialCard'
import { findPlatform } from '../data/platforms'
import { tutorials } from '../data/tutorials'
import type { Tutorial } from '../types/content'

function updateDescription(content: string) {
  const description = document.querySelector('meta[name="description"]')
  if (description) description.setAttribute('content', content)
}

export function PlatformDetail() {
  const { slug = '' } = useParams()
  const platform = findPlatform(slug)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!platform) return
    document.title = platform.seo.title
    updateDescription(platform.seo.description)
    window.scrollTo(0, 0)
    return () => {
      document.title = 'Renda Extra com Bruno Dallier | Plataformas de tarefas com IA'
      updateDescription('Renda Extra com Bruno Dallier: uma central independente para organizar, comparar e entender plataformas de tarefas relacionadas à inteligência artificial.')
    }
  }, [platform])

  if (!platform) return <Navigate to="/" replace />

  const platformTutorials = tutorials.filter((tutorial) => tutorial.platformSlug === platform.slug)
  const watchTutorial = (tutorial: Tutorial) => setNotice(`“${tutorial.title}” está pronto para receber o link público do vídeo.`)

  const facts = [
    { label: 'Pagamento', value: platform.payment },
    { label: 'Saque', value: platform.withdrawalMinimum },
    { label: 'Tarefa', value: platform.taskType },
    { label: 'Equipamento', value: platform.phone },
  ]

  return (
    <main className="platform-page">
      <section className={`opportunity-detail-hero opportunity-detail-hero--${platform.accent}`}>
        <div className="container">
          <Link className="back-link" to="/#plataformas"><ArrowLeft size={16} />Voltar para plataformas</Link>
          <div className="opportunity-detail-hero__grid">
            <div>
              <p className="detail-overline">Oportunidade / dados demonstrativos</p>
              <h1>{platform.name}</h1>
              <p className="detail-tagline">{platform.tagline}</p>
              <button type="button" className="button button--signal" onClick={() => setNotice('Este protótipo não aponta para um cadastro. Ao publicar dados reais, este botão pode receber o link oficial da plataforma.')}>Começar agora <ArrowUpRight size={18} /></button>
            </div>
            <div className="detail-pay"><span>Quanto paga?</span><strong>{platform.earning}</strong><small>Valor ilustrativo</small></div>
          </div>
          <dl className="detail-fact-strip">{facts.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
      </section>

      <section className="detail-warning">
        <div className="container"><ShieldCheck size={19} /><p>Conteúdo de interface demonstrativo: valores, pagamentos, requisitos e status só devem ser publicados após validação na fonte oficial.</p></div>
      </section>

      <section className="section detail-pay-section">
        <div className="container pay-section-layout">
          <div><p>01 / Quanto paga?</p><h2>{platform.earning}</h2><span>Valor demonstrativo por tipo de tarefa.</span></div>
          <div className="detail-list">{platform.payNotes.map((note) => <p key={note}><CheckCircle2 size={18} />{note}</p>)}</div>
        </div>
      </section>

      <section className="section detail-work-section">
        <div className="container detail-work-grid">
          <div>
            <p>02 / Como funciona?</p>
            <h2>Faça.<br />Envie.<br />Receba.</h2>
          </div>
          <ol className="detail-steps">{platform.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}<ArrowRight size={18} /></li>)}</ol>
        </div>
      </section>

      <section className="section requirements-section">
        <div className="container requirements-grid">
          <div><p>03 / Requisitos</p><h2>O que você precisa.</h2><span>Confirme tudo na fonte oficial antes de começar.</span></div>
          <ul className="requirements-list">{platform.requirements.map((requirement) => <li key={requirement}><CheckCircle2 size={18} />{requirement}</li>)}</ul>
        </div>
      </section>

      <section className="section withdraw-section">
        <div className="container withdraw-grid">
          <div className="withdraw-number">04</div>
          <div><p>Como sacar?</p><h2>Recebeu?<br />Agora saque.</h2></div>
          <dl className="withdraw-facts"><div><dt>Método</dt><dd>{platform.payment}</dd></div><div><dt>Valor mínimo</dt><dd>{platform.withdrawalMinimum}</dd></div><div><dt>Frequência</dt><dd>{platform.paymentFrequency}</dd></div><div><dt>Prazo</dt><dd>A confirmar</dd></div></dl>
        </div>
      </section>

      <section className="section detail-notes-section">
        <div className="container notes-grid">
          <div><p>05 / Atenção</p><h2>Antes de enviar.</h2></div>
          <div className="alert-list">{platform.caveats.map((caveat) => <p key={caveat}><CircleAlert size={18} />{caveat}</p>)}</div>
        </div>
      </section>

      <section className="section detail-tutorials-section">
        <div className="container">
          <div className="detail-tutorials-heading"><p>06 / Tutorial</p><h2>Veja na prática.</h2><CirclePlay size={32} /></div>
          <div className="tutorial-grid">{platformTutorials.map((tutorial) => <TutorialCard key={tutorial.id} tutorial={tutorial} onWatch={watchTutorial} />)}</div>
        </div>
      </section>

      <section className="section detail-faq-section">
        <div className="container faq-layout"><SectionHeading index="07" eyebrow="Perguntas rápidas" title={`Dúvidas sobre ${platform.name}.`} copy="O essencial antes de começar." /><FAQList items={platform.faq} idPrefix={`faq-${platform.slug}`} /></div>
      </section>

      {notice ? <div className="toast" role="status"><span>{notice}</span><button type="button" onClick={() => setNotice('')}>Fechar</button></div> : null}
    </main>
  )
}
