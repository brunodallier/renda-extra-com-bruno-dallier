import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type FAQItem = { question: string; answer: string }

export function FAQList({ items, idPrefix }: { items: FAQItem[]; idPrefix: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = index === openIndex
        const contentId = `${idPrefix}-${index}`
        return (
          <article className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.question}>
            <h3>
              <button type="button" onClick={() => setOpenIndex(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={contentId}>
                <span>{item.question}</span>
                <ChevronDown size={18} aria-hidden="true" />
              </button>
            </h3>
            <div id={contentId} className="faq-answer" hidden={!isOpen}>
              <p>{item.answer}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
