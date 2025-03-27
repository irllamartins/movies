import axios from 'axios'
import { MovieDetails } from '../screens/Details'
import { API_KEY, API_URL } from '@env'
import { Genres } from '../components/tabs'

export const api = axios.create({
    baseURL: API_URL,
    params: {
        api_key: API_KEY,
        language: "pt-BR",
        include_adult: false
    },
})

export interface Movie {
    id: number
    title: string
    poster_path: string
    overview: string
}

export const listMoviesService = async (page: number): Promise<Movie[]> => {
    try {

        const response = await api.get(`/movie/popular`, {
            params: {
               // sort_by: 'popularity.desc',
                page
            }
        })

        if (response.status === 200) {
            return response.data.results
        } else {
            console.error("Falha na requisição:", response.status);
        }
        return []

    } catch (error) {
        console.error("Erro:", error);
        return []
    }
}


export const searchMoviesService = async (search: string): Promise<Movie[]> => {
    try {
        const response = await api.get(`/search/movie`, {
            params: {
               // sort_by: 'popularity.desc',
                query: search
            }
        })

        if (response.status === 200) {
            return response.data.results
        } else {
            console.error("Falha na requisição:", response.status);
        }

    } catch (error) {
        console.error("Erro:", error);

    }
    return []
}

export const movieDetailsService = async (movieId: number): Promise<MovieDetails | null> => {
    try {
        const response = await api.get(`/movie/${movieId}`)

        return response.data
    } catch (error) {
        console.error(error)
    }
    return null
}
export const movieFavoriteService = async (movieIds: number[]): Promise<Movie[]> => {

    try {
        const moviePromises = movieIds.map(async (movieId) => {
            const response = await api.get(`/movie/${movieId}`);
            return response.data;
        });

        const list = await Promise.all(moviePromises);

        return list
    } catch (error) {
        console.error(error)
    }
    return []
}

export const listGenresService = async (): Promise<Genres[]> => {

    try {
        const response = await api.get(`/genre/movie/list`);
        return response.data['genres']
    } catch (error) {
        console.error(error)
    }
    return []
}
export const listMovieGenresService = async (genreId: number): Promise<Movie[]> => {

    try {
        const response = await api.get(`/discover/movie`, {
            params: {
                with_genres: genreId
            }
        })
        return response.data.results

    } catch (error) {
        console.error(error)
    }
    return []
}
export const similarMovieService = async (movieId: number): Promise<Movie[]> => {

    try {
        const response = await api.get(`movie/${movieId}/similar`, )
        return response.data.results

    } catch (error) {
        console.error(error)
    }
    return []
}