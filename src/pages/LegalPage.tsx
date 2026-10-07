import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { LegalSection } from '../data/legalContent'

type LegalPageProps = {
  title: string
  heading: string
  description: string
  intro: string[]
  sections: LegalSection[]
}

const defaultTitle = 'Renda Extra com Bruno Dallier | Plataformas de tarefas com IA'
const defaultDescription = 'Renda Extra com Bruno Dallier: uma central independente para organizar, comparar e entender plataformas de tarefas relacionadas à inteligência artificial.'

export function LegalPage({ title, heading, description, intro, sections }: LegalPageProps) {
  useEffect(() => {
    const previousTitle = document.title
    const descriptionTag = document.querySelector('meta[name="description"]')
    const previousDescription = descriptionTag?.getAttribute('content')
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    const createdCanonical = !canonical

    document.title = title
    descriptionTag?.setAttribute('content', description)
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.href = `${window.location.origin}${window.location.pathname}`

    return () => {
      document.title = previousTitle || defaultTitle
      descriptionTag?.setAttribute('content', previousDescription || defaultDescription)
      if (createdCanonical) canonical?.remove()
    }
  }, [title, description])

  return (
    <main className="legal-page">
      <div className="container legal-page__container">
        <Link className="legal-back" to="/"><ArrowLeft size={16} />Voltar para o site</Link>
        <article className="legal-document">
          <header className="legal-document__header">
            <p>Renda Extra com Bruno Dallier</p>
            <h1>{heading}</h1>
            <span>Última atualização: 7 de outubro de 2026</span>
          </header>
          <div className="legal-document__intro">{intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className="legal-document__body">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  )
}
