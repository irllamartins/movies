import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native"
import { CardMovies } from "../../components/CardMovies"
import { useContext, useEffect, useState } from "react"
import { listMoviesService, movieFavoriteService, searchMoviesService } from "../../services/api"
import { useNavigation } from "@react-navigation/native"
import { MagnifyingGlass } from "phosphor-react-native"
import { styles } from "./styles"
import { MovieContext } from "../../context/MoviesContext"

interface Movie {
    id: number
    title: string
    poster_path: string
    overview: string
}

const CARACTER_MIN = 0

export const Favorite = () => {
    const [myFavoriteMovies, setMyFavoriteMovies] = useState<Movie[]>([])
    const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([])

    const [loading, setLoading] = useState<boolean>(false)
    const [noResult, setnoResult] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const context = useContext(MovieContext)

    useEffect(() => {
        loadMoreData()
    }, [context.favoriteMovies])

    const loadMoreData = async () => {
        setLoading(true)
        const response = await movieFavoriteService(context.favoriteMovies)
        setMyFavoriteMovies(response)
        setLoading(false)
    }

    const searchMovies = async (search: string) => {
        setLoading(true)
        const response = myFavoriteMovies.filter(
            (item: Movie) => (item.title.toLowerCase()).includes(search.toLowerCase())
        )

        if (response.length === 0) {
            setnoResult(true)
            setSearchResultMovies([])
        }
        else {
            setnoResult(false)
            setSearchResultMovies(response)
        }
        setLoading(false)
    }

    const handleSearch = (text: string) => {
        setSearch(text)
        if (text.length > CARACTER_MIN) {
            searchMovies(text)
        }
        else {
            setSearchResultMovies([])
        }
    }

    const navigation = useNavigation()

    const renderMoviesItem = ({ item }: { item: Movie }) => {
        return <CardMovies
            data={item}
            onPress={() => navigation.navigate("Details", { movieId: item.id })}
        />
    }
    const movieData = search.length > CARACTER_MIN ? searchResultMovies : myFavoriteMovies

    return <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Listas de filmes Favoritos</Text>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#fff"
                    placeholder="Buscar"
                    onChangeText={handleSearch}
                    value={search}
                />
                <MagnifyingGlass
                    color="#fff"
                    size={25}
                    weight="light"
                />
            </View>
            {
                noResult && search && <Text style={styles.noResult}>
                    Nenhum filme encontrado "{search}"
                </Text>
            }
        </View>
        <View>
            <FlatList
                data={movieData}
                numColumns={3}
                renderItem={renderMoviesItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    paddingTop: 0
                }}
                onEndReached={() => loadMoreData()}
                onEndReachedThreshold={0.6}
            />
            {loading && <ActivityIndicator size={50} color='#0296e5' />}
        </View>
    </View>
}