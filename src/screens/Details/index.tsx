import { useNavigation, useRoute } from "@react-navigation/native";
import { memo, useContext, useEffect, useState } from "react";
import { Movie, movieDetailsService, similarMovieService } from "../../services/api";
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Image } from "react-native";
import { BookmarkSimple, CalendarBlank, CaretLeft, Clock, Star } from "phosphor-react-native";
import { MovieContext } from "../../context/MoviesContext";
import { Genres } from "../../components/tabs";
import { CardMovies } from "../../components/CardMovies";

export type MovieDetails = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    runtime: string;
    release_date: string;
    vote_average: number;
    genres: Genres[]

}

type RouterProps = {
    movieId: number;
}

export const Details = () => {
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>()
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    const navigation = useNavigation()
    const route = useRoute()
    const { movieId } = route.params as RouterProps

    useEffect(() => {
        loadMovieDetails(movieId)
        loadSimilarMovies(movieId)
    }, [movieId])

    useEffect(() => {

    }, [])

    const loadSimilarMovies = async (movieId: number) => {
        const response = await similarMovieService(movieId)
        setSimilarMovies(response)
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

    const Item = memo(({ item }: { item: string }) => {
        return <Text style={styles.genresContainer}>
            <Text >{item}</Text>
        </Text>
    });

    const renderMoviesItem = (({ item }: { item: Movie }) => {
        return <CardMovies
            data={item}
            onPress={() => navigation.navigate("Details", { movieId: item.id })}
        />;
    });


    return (
        <View style={styles.container}>
            {
                loading ?
                    <ActivityIndicator style={styles.loading} size="large" /> :
                    <ScrollView
                             /*   horizontal={true}
                                contentContainerStyle={{ flexGrow: 1 }}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                style={{ flex: 0 }}*/
                            >
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
                            <View>
                                <Text style={styles.aboutText}>Sinopse</Text>
                                <View style={styles.underline} />
                            </View>
                            <Text style={styles.aboutText}>
                                {movieDetails?.overview === ""
                                    ? "Ops! Parece que esse filme ainda não tem sinopse :-("
                                    : movieDetails?.overview}
                            </Text>
                        </View>
                        <View style={styles.about}>
                            <View >
                                <Text style={styles.aboutText}>Genero </Text>
                                <View style={styles.underline} />
                            </View>
                            {
                                movieDetails?.genres && movieDetails?.genres?.length > 0 ?
                                    movieDetails.genres.map((item: Genres, index: number) => {
                                        return (
                                            <Item item={item.name} key={index} />
                                        )
                                    })
                                    : <Text >Ops! Genero cadastrado</Text>
                            }

                        </View>
                        <View style={styles.about}>
                            <View >
                                <Text style={styles.aboutText}>Filmes similares</Text>
                                <View style={styles.underline} />
                            </View>
                            <FlatList
                                data={similarMovies}
                                renderItem={renderMoviesItem}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index: number) => `movie_${item.id.toString()}_${index}`}
                                contentContainerStyle={{
                                     paddingTop: 12,
                                }}
                                key={'similar'}
                                horizontal={true}
                                onEndReached={() => loadSimilarMovies(movieId)}
                                onEndReachedThreshold={0.5}
                            />
                        </View>
                    </ScrollView>
            }

        </View >
    )
}