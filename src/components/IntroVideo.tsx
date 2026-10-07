import { Play } from 'lucide-react'
import { useRef, useState } from 'react'
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
  const [previewFrame, setPreviewFrame] = useState('')
  const previewSeekingRef = useRef(false)
  const source = embedUrl(video)

  if (isPlaying && source && (video.provider === 'instagram' || video.provider === 'youtube' || video.provider === 'vimeo')) {
    return <div className="intro-video intro-video--embedded"><iframe src={source} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
  }

  if (isPlaying && source && video.provider === 'local') {
    return <video className="intro-video intro-video--embedded" controls autoPlay preload="metadata"><source src={source} /></video>
  }

  const handlePlay = () => source ? setIsPlaying(true) : onUnavailable()
  const hasLocalPreview = video.provider === 'local' && Boolean(source)
  const capturePreviewFrame = (media: HTMLVideoElement) => {
    if (!media.videoWidth || !media.videoHeight) return

    try {
      const canvas = document.createElement('canvas')
      canvas.width = media.videoWidth
      canvas.height = media.videoHeight
      const context = canvas.getContext('2d')
      if (!context) return
      context.drawImage(media, 0, 0, canvas.width, canvas.height)
      setPreviewFrame(canvas.toDataURL('image/jpeg', 0.9))
    } catch {
      // The already-seeked video remains visible when the browser blocks canvas capture.
    }
  }
  const seekPreviewFrame = (media: HTMLVideoElement) => {
    const duration = Number.isFinite(media.duration) ? media.duration : 0
    const previewTime = duration > 0.2 ? Math.min(1.5, duration * 0.15) : 0.1

    if (Math.abs(media.currentTime - previewTime) < 0.05) {
      capturePreviewFrame(media)
      return
    }

    previewSeekingRef.current = true
    media.currentTime = previewTime
  }

  return (
    <button className="intro-video" type="button" onClick={handlePlay} aria-label={`Assistir ${video.title}`}>
      {hasLocalPreview
        ? previewFrame
          ? <img src={previewFrame} alt="" />
          : <video className="intro-video__preview" src={source} muted playsInline preload="auto" aria-hidden="true" onLoadedData={({ currentTarget }) => seekPreviewFrame(currentTarget)} onSeeked={({ currentTarget }) => { if (previewSeekingRef.current) { previewSeekingRef.current = false; capturePreviewFrame(currentTarget) } }} />
        : <img src={images[video.image]} alt="" />}
      <span className="intro-video__label">{video.label}</span>
      <span className="intro-video__play"><Play size={24} fill="currentColor" /></span>
    </button>
  )
}
