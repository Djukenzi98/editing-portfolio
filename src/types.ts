export type Category =
  | 'movie-tv'
  | 'nature'
  | 'anime'
  | 'gaming'
  | 'logo-animation'

export type AspectRatio = '16:9' | '9:16'

export interface Project {
  id: string
  title: string
  category: Category
  embedUrl: string
  aspectRatio: AspectRatio
  description: string
  tags: string[]
}

export interface FilterOption {
  label: string
  value: Category | 'all'
}
