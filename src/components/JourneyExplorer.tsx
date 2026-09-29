import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import type { JourneyStep } from '../types/content'

function JourneyStage({ step, className = '' }: { step: JourneyStep; className?: string }) {
  return (
    <article className={`journey-explorer__stage ${className}`}>
      <p>{step.number} / {step.title}</p>
      <h3>{step.headline}</h3>
      <p>{step.description}</p>
      <div><span>{step.note}</span><ArrowUpRight size={20} /></div>
    </article>
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
              </button>
              {isActive ? <JourneyStage step={step} className="journey-explorer__mobile-stage" /> : null}
            </div>
          )
        })}
      </div>
      <JourneyStage key={activeStep.number} step={activeStep} />
    </div>
  )
}
