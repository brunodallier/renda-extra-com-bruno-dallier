import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import heroImage from '../assets/hero-oportunidades.png'
import reviewImage from '../assets/task-review.png'
import taskImage from '../assets/tutorial-tarefas.png'
import voiceImage from '../assets/task-voice.png'
import type { TaskExample } from '../types/content'

const images = { hero: heroImage, task: taskImage, voice: voiceImage, review: reviewImage }

export function TaskCarousel({ tasks }: { tasks: TaskExample[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTask = tasks[activeIndex]

  const move = (direction: -1 | 1) => setActiveIndex((current) => (current + direction + tasks.length) % tasks.length)

  return (
    <div className="task-carousel" role="region" aria-roledescription="carrossel" aria-label="Exemplos de tarefas">
      <div className="task-carousel__image">
        <img src={images[activeTask.image]} alt="" key={activeTask.id} />
        <span>{String(activeIndex + 1).padStart(2, '0')} / {String(tasks.length).padStart(2, '0')}</span>
      </div>
      <div className="task-carousel__content">
        <p>Exemplo de tarefa</p>
        <h3>{activeTask.title}</h3>
        <p>{activeTask.description}</p>
        <div className="task-carousel__footer">
          <div className="task-carousel__controls">
            <button type="button" aria-label="Tarefa anterior" data-tooltip="Anterior" onClick={() => move(-1)}><ArrowLeft size={20} /></button>
            <button type="button" aria-label="Próxima tarefa" data-tooltip="Próxima" onClick={() => move(1)}><ArrowRight size={20} /></button>
          </div>
          <div className="task-carousel__dots" aria-label="Selecionar tarefa">
            {tasks.map((task, index) => <button key={task.id} type="button" aria-label={`Ver ${task.title}`} aria-current={activeIndex === index} onClick={() => setActiveIndex(index)} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
