import { Credits, ProductionCompanies } from "./credit"

export type MovieDetails = {
    id: number
    title: string
    overview: string
    poster_path: string
    backdrop_path: string
    runtime: string
    release_date: string
    vote_average: number
    genres: Genres[]
    production_companies: ProductionCompanies[]
    credit: Credits
}
export interface Genres {
    id: number
    name: string
}
