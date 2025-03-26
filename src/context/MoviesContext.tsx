import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    useCallback,
    useEffect,
    useState
} from "react";

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    runtime: string;
    release_date: string;
    vote_average: number;
}

type MovieContextData = {
    favoriteMovies: number[]
    watchLaterMovies: number[]

    addFavoriteMovies: (movieId: number) => void
    removeFavoriteMovies: (movieId: number) => void
    addWatchLaterMovies: (movieId: number) => void
    removeWatchLaterMovies: (movieId: number) => void
}

export const MovieContext = createContext<MovieContextData>(
    {
        favoriteMovies: [],
        watchLaterMovies: [],

        addFavoriteMovies: () => { },
        removeFavoriteMovies: () => { },

        addWatchLaterMovies: () => { },
        removeWatchLaterMovies: () => { }

    }
)

type MovieProviderProps = {
    children: React.ReactNode
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
    const [favoriteMovies, setFavoriteMovies] = useState<number[]>([])
    const [watchLaterMovies, setWatchLaterMovies] = useState<number[]>([])

    useEffect(() => {
        loadFavoriteMovies()
        loadWatchLaterMovies()
    }, [])
    useEffect(() => {
    }, [watchLaterMovies])


    const loadFavoriteMovies = async () => {
        const favoriteMoviesStoraged = await AsyncStorage.getItem("@FavoriteMovies")
        if (favoriteMoviesStoraged) {
            setFavoriteMovies(JSON.parse(favoriteMoviesStoraged))
        }
    }
    const loadWatchLaterMovies = async () => {
        const watchLaterMoviesStoraged = await AsyncStorage.getItem("@WatchLaterMovies")
        if (watchLaterMoviesStoraged) {
            setWatchLaterMovies(JSON.parse(watchLaterMoviesStoraged))
        }
    }
    const addWatchLaterMovies = useCallback((
        async (movieId: number) => {
            if (!watchLaterMovies.includes(movieId)) {
                const newWatchLaterMovies = [movieId, ...watchLaterMovies]
                setWatchLaterMovies(newWatchLaterMovies)
                await AsyncStorage.setItem(
                    "@WatchLaterMovies",
                    JSON.stringify(newWatchLaterMovies)
                )
            }
        }
    ), [watchLaterMovies])

    const removeWatchLaterMovies = useCallback((
        async (movieId: number) => {   
            const newWatchLaterMovies = watchLaterMovies.filter((id: number) => id !== movieId)
            setWatchLaterMovies(newWatchLaterMovies)
            await AsyncStorage.setItem(
                "@WatchLaterMovies",
                JSON.stringify(newWatchLaterMovies)
            )
        }
    ), [watchLaterMovies])

    const addFavoriteMovies = useCallback((
        async (movieId: number) => {
            if (!favoriteMovies.includes(movieId)) {
                const newFavoriteMovies = [movieId, ...favoriteMovies]
                setFavoriteMovies(newFavoriteMovies)
                await AsyncStorage.setItem(
                    "@FavoriteMovies",
                    JSON.stringify(newFavoriteMovies)
                )
            }
        }
    ), [favoriteMovies])

    const removeFavoriteMovies = useCallback((
        async (movieId: number) => {   
            const newFavoriteMovies = favoriteMovies.filter((id: number) => id !== movieId)
            setFavoriteMovies(newFavoriteMovies)
            await AsyncStorage.setItem(
                "@FavoriteMovies",
                JSON.stringify(newFavoriteMovies)
            )
        }
    ), [favoriteMovies])

    const contextData: MovieContextData ={
        favoriteMovies,
        watchLaterMovies,
        addFavoriteMovies,
        removeFavoriteMovies,
        addWatchLaterMovies,
        removeWatchLaterMovies
    }
    return (
        <MovieContext.Provider value={contextData}>
            {children}
        </MovieContext.Provider>
    )
}