import axios from 'axios'
 
const API_KEY="9bbbf4e53b66f49f1ea086ad10c8d949"
const API_URL="https://api.themoviedb.org/3"
const BEARER="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmJiZjRlNTNiNjZmNDlmMWVhMDg2YWQxMGM4ZDk0OSIsIm5iZiI6MTc0MjE1MTAyNC4zNiwic3ViIjoiNjdkNzFkNzBlYmMzMGEwYjQ4MDEzN2ZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.t4uGZcRqfqKd_PCrC5T76Xir6x3WlxzmmNTT0ZhcmbU"

export const api = axios.create({
    baseURL: API_URL,
    params: {
        api_key: API_KEY,
        language: "pt-BR",
        include_adult: false
    },
})

interface Movie {
    id: number
    title: string
    poster_path: string
    overview: string
}

export const listMoviesService = async (page:number): Promise<Movie[]> => {
    try { 

        const response = await api.get(`/movie/popular`,{
            params:{
                page
            }
        })

       // console.log(API_URL, "entrou", response.data.results[0])   

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


export const searchMoviesService = async (search:string): Promise<Movie[]> => {
    try { 
        const response = await api.get(`/search/movie`,{
            params:{
                query:search
            }
        })

        //console.log(API_URL, "entrou", response.data.results)   

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
