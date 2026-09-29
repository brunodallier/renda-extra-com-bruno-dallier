import { Play } from 'lucide-react'
import { useState } from 'react'
import heroImage from '../assets/hero-oportunidades.png'
import reviewImage from '../assets/task-review.png'
import taskImage from '../assets/tutorial-tarefas.png'
import voiceImage from '../assets/task-voice.png'
import type { IntroVideo as IntroVideoData } from '../types/content'

const images = { hero: heroImage, task: taskImage, voice: voiceImage, review: reviewImage }

function embedUrl(video: IntroVideoData) {
  if (!video.url) return ''
  if (video.provider === 'instagram') {
    const normalized = video.url.endsWith('/') ? video.url : `${video.url}/`
    return normalized.includes('/embed/') ? normalized : `${normalized}embed/`
  }
  if (video.provider === 'youtube') return video.url.includes('youtube.com/embed/') ? video.url : `https://www.youtube.com/embed/${video.url}`
  if (video.provider === 'vimeo') return video.url.includes('player.vimeo.com/video/') ? video.url : `https://player.vimeo.com/video/${video.url}`
  return video.url
}

export function IntroVideo({ video, onUnavailable }: { video: IntroVideoData; onUnavailable: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const source = embedUrl(video)

  if (isPlaying && source && (video.provider === 'instagram' || video.provider === 'youtube' || video.provider === 'vimeo')) {
    return <div className="intro-video intro-video--embedded"><iframe src={source} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
  }

  if (isPlaying && source && video.provider === 'local') {
    return <video className="intro-video intro-video--embedded" controls autoPlay preload="metadata"><source src={source} /></video>
  }

  const handlePlay = () => source ? setIsPlaying(true) : onUnavailable()
  const hasLocalPreview = video.provider === 'local' && Boolean(source)

  return (
    <button className="intro-video" type="button" onClick={handlePlay} aria-label={`Assistir ${video.title}`}>
      {hasLocalPreview
        ? <video className="intro-video__preview" src={source} muted playsInline preload="auto" aria-hidden="true" onLoadedMetadata={({ currentTarget }) => { currentTarget.currentTime = 0.1 }} />
        : <img src={images[video.image]} alt="" />}
      <span className="intro-video__label">{video.label}</span>
      <span className="intro-video__play"><Play size={24} fill="currentColor" /></span>
    </button>
  )
}
