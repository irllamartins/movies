import { FlatList, Text, View } from "react-native"
import { styles } from "./styles"
import { memo } from "react"
import { CardMovies } from "../../components/CardMovies"
import { useNavigation } from "@react-navigation/native"
import { Genres, MovieDetails } from "../../model/movie"

interface Props {
    movieId:number
    movieDetails: MovieDetails| undefined| null
    similarMovies: MovieDetails[]

    loadMovieDetails(movieId: number): void
    loadSimilarMovies(movieId:number):void
}


export const About = (props: Props) => {
    const {
        movieId,
        movieDetails,
        similarMovies,
        loadMovieDetails,
        loadSimilarMovies
    } = props
    const navigation = useNavigation()

    const Item = memo(({ item }: { item: string }) => {
        return <Text style={styles.genresContainer}>
            <Text >{item}</Text>
        </Text>
    });

    const renderMoviesItem = (({ item }: { item: MovieDetails }) => {
        return <CardMovies
            data={item}
            onPress={() => navigation.navigate("Details", { movieId: item.id })}
        />;
    });

    return (<>
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
                <Text style={styles.aboutText}>Gênero</Text>
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
    </>
    )
}