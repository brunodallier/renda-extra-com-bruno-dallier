export type FilterKey = 'all' | 'pix' | 'dollar' | 'crypto' | 'beginner' | 'mobile'

export type ContentImage = 'hero' | 'task' | 'voice' | 'review'

export type Platform = {
  slug: string
  name: string
  monogram: string
  label: string
  tagline: string
  accent: 'jade' | 'coral' | 'ochre' | 'ink'
  description: string
  taskType: string
  earning: string
  payment: string
  paymentFrequency: string
  withdrawal: string
  withdrawalMinimum: string
  countries: string
  experience: string
  phone: string
  requirements: string[]
  steps: string[]
  payNotes: string[]
  highlights: string[]
  caveats: string[]
  faq: Array<{ question: string; answer: string }>
  filters: FilterKey[]
  status: string
  seo: { title: string; description: string }
}

export type Tutorial = {
  id: string
  title: string
  category: string
  platformSlug: string
  duration: string
  thumbnailPosition: string
  image: ContentImage
  url?: string
}

export type JourneyStep = {
  number: string
  title: string
  headline: string
  description: string
  note: string
}

export type TaskExample = {
  id: string
  title: string
  description: string
  image: ContentImage
}

export type IntroVideo = {
  title: string
  duration: string
  label: string
  provider: 'placeholder' | 'instagram' | 'youtube' | 'vimeo' | 'local'
  url?: string
  image: ContentImage
}
