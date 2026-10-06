import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { motionTokens } from '../lib/motion'
import type { JourneyStep } from '../types/content'

function JourneyStage({ step, className = '' }: { step: JourneyStep; className?: string }) {
  return (
    <motion.article className={`journey-explorer__stage ${className}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: motionTokens.duration.component, ease: motionTokens.easing.enter }}>
      <p>{step.number} / {step.title}</p>
      <h3>{step.headline}</h3>
      <p>{step.description}</p>
      <div><span>{step.note}</span><ArrowUpRight size={20} /></div>
    </motion.article>
  )
}

export function JourneyExplorer({ steps }: { steps: JourneyStep[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = steps[activeIndex]

  return (
    <div className="journey-explorer">
      <div className="journey-explorer__list" role="tablist" aria-label="Etapas para começar">
        {steps.map((step, index) => {
          const isActive = activeIndex === index
          return (
            <div key={step.number} className="journey-explorer__item">
              <button type="button" role="tab" aria-selected={isActive} className={isActive ? 'is-active' : ''} onClick={() => setActiveIndex(index)}>
                <span>{step.number}</span><strong>{step.title}</strong>
                {isActive ? <motion.i className="journey-explorer__indicator" layoutId="journey-indicator" transition={motionTokens.spring} /> : null}
              </button>
              <AnimatePresence initial={false}>{isActive ? <JourneyStage key={step.number} step={step} className="journey-explorer__mobile-stage" /> : null}</AnimatePresence>
            </div>
          )
        })}
      </div>
      <AnimatePresence mode="wait"><JourneyStage key={activeStep.number} step={activeStep} /></AnimatePresence>
    </div>
  )
}
