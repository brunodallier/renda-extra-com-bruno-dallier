import { Play } from 'lucide-react'
import heroImage from '../assets/hero-oportunidades.png'
import taskImage from '../assets/tutorial-tarefas.png'
import { findPlatform } from '../data/platforms'
import type { Tutorial } from '../types/content'

export function TutorialCard({ tutorial, onWatch }: { tutorial: Tutorial; onWatch: (tutorial: Tutorial) => void }) {
  const platform = findPlatform(tutorial.platformSlug)
  if (!platform) return null
  const image = tutorial.image === 'hero' ? heroImage : taskImage

  return (
    <article className="editorial-video">
      <button className="editorial-video__thumb" type="button" aria-label={`Assistir ${tutorial.title}`} onClick={() => onWatch(tutorial)}>
        <img src={image} alt="" style={{ objectPosition: tutorial.thumbnailPosition }} />
        <span className="video-duration">{tutorial.duration}</span>
        <span className="video-play" aria-hidden="true">
          <Play size={18} fill="currentColor" />
        </span>
      </button>
      <div className="editorial-video__body">
        <div className="editorial-video__meta"><span>{tutorial.category}</span><span>{platform.name}</span></div>
        <h3>{tutorial.title}</h3>
        <p>Ver vídeo <Play size={13} fill="currentColor" /></p>
      </div>
    </article>
  )
}
