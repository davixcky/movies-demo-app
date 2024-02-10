export interface GetMoviesResponse {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}

export interface Movie {
    adult: boolean
    backdrop_path: string
    id: number
    title: string
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[];
    genres: Genre[];
    popularity: number
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
    videos: Videos
}

export interface GetGenresResponse {
    genres: Genre[]
}

export interface Genre {
    id: number
    name: string
}

export interface GetCastAndCrewResponse {
    id: number
    cast: Cast[]
    crew: Crew[]
}

export interface Cast {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export interface Crew {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    credit_id: string
    department: string
    job: string
}

export interface Videos {
    results: Video[]
}

export interface Video {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}
