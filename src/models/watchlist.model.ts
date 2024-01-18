export interface WatchlistModel {
  page: number
  results: WatchlistDataModel[]
  total_pages: number
  total_results: number
}

export interface WatchlistDataModel {
  adult: boolean
  backdrop_path: string
  id: number
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  title: string
  genre_ids?: number[]
  popularity?: number
  release_date?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}
