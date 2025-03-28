import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { loadCretidService, movieDetailsService, similarMovieService } from "../../services/api";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { Image } from "react-native";
import { CalendarBlank, Clock, Star } from "phosphor-react-native";
import { TabsGenres } from "../../components/tabs";
import { About } from "./about";
import { Production } from "./production";
import { Genres, MovieDetails } from "../../model/movie";
import { Credits } from "../../model/credit";

type RouterProps = {
    movieId: number;
}

export const Details = () => {
    const [movieDetails, setMovieDetails] = useState<MovieDetails>()
    const [similarMovies, setSimilarMovies] = useState<MovieDetails[]>([])
    const [creditsMovie, setCreditsMovie] = useState<Credits>()
    const [listTab] = useState<Genres[]>([{ id: 0, name: "Sobre o filme" }, { id: 1, name: "Produção" }])
    const [activeTab, setActiveTab] = useState<Genres>({ id: 0, name: "Sobre" })

    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)


    const route = useRoute()
    const { movieId } = route.params as RouterProps

    useEffect(() => {
        loadMovieDetails(movieId)
        loadSimilarMovies(movieId)
        loadCredits(movieId)
    }, [movieId])


    const loadSimilarMovies = async (movieId: number) => {
        const response = await similarMovieService(movieId)
        if(response){
             setSimilarMovies(response)
        }
        setPage(page + 1)
    }

    const loadMovieDetails = async (movieId: number) => {
        setLoading(true)
        const movie = await movieDetailsService(movieId)
        if (movie) {
            setMovieDetails(movie)
        }
        setLoading(false)
    }

    const getYear = (data: string | undefined) => {
        if (data) {
            const year = new Date(data)?.getFullYear()
            return year
        }
        return "???"
    }
    const loadCredits = async (movieId: number) => {
        const response = await loadCretidService(movieId)
        if(response){
            setCreditsMovie(response)
        }
    }

    return (
        <View style={styles.container}>
            {
                loading ?
                    <ActivityIndicator style={styles.loading} size="large" /> :
                    <ScrollView>
                        <View>
                            <Image
                                source={{
                                    uri: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`,
                                }}
                                style={styles.detailsImage}
                            />
                            <Image
                                source={{
                                    uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
                                }}
                                style={styles.detailsPosterImage}
                            />
                            <Text style={styles.titleMovie}>{movieDetails?.title}</Text>
                            <View style={styles.description}>
                                <View style={styles.descriptionGroup}>
                                    <CalendarBlank color="#92929D" size={25} weight="thin" />
                                    <Text style={styles.descriptionText}>
                                        {getYear(movieDetails?.release_date)}
                                    </Text>
                                </View>
                                <View style={styles.descriptionGroup}>
                                    <Clock color="#92929D" size={25} weight="thin" />
                                    <Text
                                        style={styles.descriptionText}
                                    >{`${movieDetails?.runtime || "???"} minutos`}</Text>
                                </View>
                                <View style={styles.descriptionGroup}>
                                    <Star
                                        color={
                                            Number(movieDetails?.vote_average) >= 7
                                                ? "#FF8700"
                                                : "#92929D"
                                        }
                                        size={25}
                                        weight={
                                            Number(movieDetails?.vote_average) >= 7
                                                ? "duotone"
                                                : "thin"
                                        }
                                    />
                                    <Text
                                        style={[
                                            Number(movieDetails?.vote_average) >= 7
                                                ? styles.descriptionText1
                                                : styles.descriptionText,
                                        ]}
                                    >
                                        {movieDetails?.vote_average.toFixed(1)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <TabsGenres genres={listTab} active={activeTab} setValue={setActiveTab} />
                        {
                            activeTab.id === 0 && <About
                                movieId={movieId}
                                movieDetails={movieDetails}
                                similarMovies={similarMovies}
                                loadMovieDetails={loadMovieDetails}
                                loadSimilarMovies={loadSimilarMovies}
                            />
                        }
                        {
                            activeTab.id === 1 && <Production
                                movieDetails={movieDetails}
                                movieId={movieId}
                                creditsMovie={creditsMovie}
                            />
                        }
                    </ScrollView>
            }

        </View >
    )
}