import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { motionTokens } from '../lib/motion'

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
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: motionTokens.duration.component, ease: motionTokens.easing.standard }}><ChevronDown size={18} aria-hidden="true" /></motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div id={contentId} className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: motionTokens.duration.component, ease: motionTokens.easing.enter }}>
                  <p>{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        )
      })}
    </div>
  )
}
