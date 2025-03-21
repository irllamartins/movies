import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { movieDetailsService } from "../../services/api";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Image } from "react-native";
import { BookmarkSimple, CalendarBlank, CaretLeft, Clock, Star } from "phosphor-react-native";

export type MovieDetails = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    runtime: string;
    release_date: string;
    vote_average: number;
}

type RouterProps = {
    movieId: number;
}

export const Details = () => {
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>()
    const [loading, setLoading] = useState<boolean>(false)

    const route = useRoute()
    const { movieId } = route.params as RouterProps

    useEffect(() => {
        loadMovieDetails(movieId)
    }, [movieId])

    const loadMovieDetails = async (movieId: number) => {
        setLoading(true)
        const movie = await movieDetailsService(movieId)
        if (movie) {
            //    console.log("!@",`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`)
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
    return (
        <View style={styles.container}>
            {
                loading ?
                    <ActivityIndicator style={styles.loading} size="large" /> :
                    <>
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
                        <View style={styles.about}>
                            <Text style={styles.aboutText}>Sinopse</Text>
                            <Text style={styles.aboutText}>
                                {movieDetails?.overview === ""
                                    ? "Ops! Parece que esse filme ainda não tem sinopse :-("
                                    : movieDetails?.overview}
                            </Text>
                        </View>
                    </>
            }
        </View >
    )
}