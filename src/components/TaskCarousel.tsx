import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import commercialSheet from '../assets/tasks-commercial-sheet.png'
import residentialSheet from '../assets/tasks-residential-sheet.png'

type Category = 'residential' | 'commercial'
type Task = { title: string; panel: number }

const tasks: Record<Category, Task[]> = {
  residential: [
    { title: 'Montagem de móveis', panel: 0 }, { title: 'Guardar compras e alimentos', panel: 1 }, { title: 'Limpar e arrumar quarto', panel: 2 }, { title: 'Trocar lençóis e arrumar cama', panel: 3 },
    { title: 'Limpar carro', panel: 4 }, { title: 'Limpar e arrumar cozinha', panel: 5 }, { title: 'Alimentar pet', panel: 6 }, { title: 'Tarefas de jardinagem', panel: 7 },
    { title: 'Tirar o lixo', panel: 8 }, { title: 'Passear com cachorro', panel: 9 }, { title: 'Limpar e arrumar banheiro', panel: 10 },
  ],
  commercial: [
    { title: 'Hidráulica e elétrica', panel: 0 }, { title: 'Serviços de mecânica', panel: 1 }, { title: 'Restaurante e cozinhas comerciais', panel: 2 }, { title: 'Manufatura', panel: 3 },
    { title: 'Marcenaria e móveis', panel: 4 }, { title: 'Técnico em eletrônica e informática', panel: 5 }, { title: 'Salão de beleza', panel: 6 }, { title: 'Costura', panel: 7 },
  ],
}

const categoryLabel: Record<Category, string> = { residential: 'Tarefa residencial', commercial: 'Tarefa comercial' }

function panelPosition(panel: number, category: Category) {
  const columns = 4
  const rows = category === 'residential' ? 3 : 2
  return {
    backgroundImage: `url(${category === 'residential' ? residentialSheet : commercialSheet})`,
    backgroundPosition: `${((panel % columns) / (columns - 1)) * 100}% ${(Math.floor(panel / columns) / (rows - 1)) * 100}%`,
    // Keep each source photo at its native aspect ratio while cropping out the sheet gutters.
    backgroundSize: '440% auto',
  }
}

export function TaskCarousel() {
  const [category, setCategory] = useState<Category>('residential')
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const categoryTasks = tasks[category]
  const move = (direction: -1 | 1) => setActiveIndex((current) => (current + direction + categoryTasks.length) % categoryTasks.length)
  const visibleIndexes = [-1, 0, 1].map((offset) => (activeIndex + offset + categoryTasks.length) % categoryTasks.length)

  const selectCategory = (nextCategory: Category) => {
    setCategory(nextCategory)
    setActiveIndex(0)
  }

  return (
    <div className="task-browser" onTouchStart={(event) => setTouchStart(event.touches[0].clientX)} onTouchEnd={(event) => {
      if (touchStart === null) return
      const distance = event.changedTouches[0].clientX - touchStart
      if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1)
      setTouchStart(null)
    }}>
      <div className="task-browser__tabs" role="tablist" aria-label="Tipo de tarefa">
        <button type="button" role="tab" aria-selected={category === 'residential'} className={category === 'residential' ? 'is-active' : ''} onClick={() => selectCategory('residential')}>Residenciais</button>
        <button type="button" role="tab" aria-selected={category === 'commercial'} className={category === 'commercial' ? 'is-active' : ''} onClick={() => selectCategory('commercial')}>Comerciais</button>
      </div>

      <div className="task-browser__gallery" role="region" aria-roledescription="carrossel" aria-label={category === 'residential' ? 'Tarefas residenciais' : 'Tarefas comerciais'}>
        <button className="task-browser__arrow" type="button" aria-label="Tarefa anterior" onClick={() => move(-1)}><ArrowLeft size={20} /></button>
        <div className="task-browser__cards">
          {visibleIndexes.map((taskIndex, position) => {
            const task = categoryTasks[taskIndex]
            const isActive = position === 1
            return <button key={`${category}-${task.title}`} type="button" className={`task-browser__card ${isActive ? 'is-active' : ''}`} onClick={() => setActiveIndex(taskIndex)} aria-current={isActive}>
              <span className="task-browser__image" style={panelPosition(task.panel, category)} role="img" aria-label={task.title} />
              <span className="task-browser__body"><small>{categoryLabel[category]}</small><strong>{task.title}</strong><em>Grave suas mãos realizando a tarefa seguindo as instruções.</em></span>
            </button>
          })}
        </div>
        <button className="task-browser__arrow" type="button" aria-label="Próxima tarefa" onClick={() => move(1)}><ArrowRight size={20} /></button>
      </div>

      <div className="task-browser__footer"><p>{category === 'residential' ? 'Tarefas para sua rotina em casa.' : 'Tarefas realizadas no seu ambiente de trabalho.'}</p><div className="task-browser__dots" aria-label="Selecionar tarefa">{categoryTasks.map((task, index) => <button key={task.title} type="button" aria-label={`Ver ${task.title}`} aria-current={activeIndex === index} onClick={() => setActiveIndex(index)} />)}</div></div>
    </div>
  )
}
