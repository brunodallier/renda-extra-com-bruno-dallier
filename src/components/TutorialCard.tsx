import { Play } from 'lucide-react'
import type { Tutorial } from '../types/content'

export function TutorialCard({ tutorial }: { tutorial: Tutorial; onWatch?: (tutorial: Tutorial) => void }) {
  const videoId = tutorial.url?.split('/').pop()
  const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/sddefault.jpg` : null

  return (
    <article className={`editorial-video ${thumbnail ? 'editorial-video--published' : 'editorial-video--placeholder'}`}>
      {thumbnail && tutorial.url ? (
        <a className="editorial-video__thumb" href={tutorial.url} target="_blank" rel="noopener noreferrer" aria-label={`Assistir ${tutorial.title} no YouTube`}>
          <img src={thumbnail} alt="" />
          <span className="video-duration">YouTube</span>
          <span className="video-play" aria-hidden="true"><Play size={18} fill="currentColor" /></span>
        </a>
      ) : (
        <div className="editorial-video__thumb" aria-label={`Tutorial em preparação: ${tutorial.title}`}>
          <span className="video-duration">Em breve</span>
          <span className="video-play" aria-hidden="true"><Play size={18} fill="currentColor" /></span>
        </div>
      )}
      <div className="editorial-video__body">
        <div className="editorial-video__meta"><span>{tutorial.category}</span><span>Hub</span></div>
        <h3>{tutorial.title}</h3>
        <p>{thumbnail ? 'Assistir no YouTube' : 'Vídeo em preparação'}</p>
      </div>
    </article>
  )
}
