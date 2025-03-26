import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native"
import { styles } from "./styles"
import { MagnifyingGlass } from "phosphor-react-native"
import { useEffect, useState } from "react"
import { listGenresService, listMovieGenresService, listMoviesService, searchMoviesService } from "../../services/api"
import { CardMovies } from "../../components/CardMovies"
import { useNavigation } from "@react-navigation/native"
import { ShowCaseMovies } from "../../components/ShowCaseMovies"
import { Genres, TabsGenres } from "../../components/tabs"

interface Movie {
    id: number
    title: string
    poster_path: string
    overview: string
}

export function Home() {
    const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([])
    const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([])
    const [listGenres, setListGenres] = useState<Genres[]>([{ id: 0, name: "Todos" }])
    const [activeGenres, setActiveGenres] = useState<Genres>({ id: 0, name: "Todos" })
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [noResult, setnoResult] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        loadMoreData()
        loadGenrer()
    }, [])

    useEffect(() => {
        listMoviesGenresActive()
    }, [activeGenres, listGenres])

    const listMoviesGenresActive = async () => {
        if (activeGenres.id > 0) {
            const listMoviesActives = await listMovieGenresService(activeGenres.id)
            setDiscoveryMovies(listMoviesActives)
        }
    }

    const loadMoreData = async () => {
        setLoading(true)
        const response = await listMoviesService(page)
        setDiscoveryMovies([...discoveryMovies, ...response])
        setPage(page + 1)
        setLoading(false)
    }

    const loadGenrer = async () => {
        const listGenresAPI = await listGenresService()
        setListGenres([...listGenres, ...listGenresAPI])
    }

    const searchMovies = async (search: string) => {
        setLoading(true)
        const response = await searchMoviesService(search)

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
        if (text.length > 2) {
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
    const movieData = search.length > 2 ? searchResultMovies : discoveryMovies

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>O que você assisti hoje?</Text>

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

            </View>

            <View>
                <View >
                    {!search && <FlatList
                        key={"flat_1"}
                        data={discoveryMovies.slice(0, 10)}
                        renderItem={({ item, index }: { item: Movie, index: number }) => {
                            return <ShowCaseMovies
                                data={item}
                                position={index}
                                onPress={() => navigation.navigate("Details", { movieId: item.id })}
                            />
                        }}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        keyExtractor={(item) => item.id.toString()}
                        style={{ minHeight: 340 }}
                    />
                    }
                    {
                        !search && <TabsGenres
                            genres={listGenres}
                            active={activeGenres}
                            setValue={setActiveGenres} />
                    }
                    <FlatList
                        data={movieData.slice(10)}
                        renderItem={renderMoviesItem}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{
                            padding: 35,
                            paddingBottom: 600
                        }}
                        key={search ? 'vertical' : 'horizontal'} 
                        horizontal={!search}
                        numColumns={search ? 3 : 1} 
                        onEndReached={() => loadMoreData()}
                        onEndReachedThreshold={0.6}
                    />
                </View>
            </View>
            {
                noResult && search && <Text style={styles.noResult}>
                    Nenhum filme encontrado "{search}"
                </Text>
            }
            {loading && <ActivityIndicator size={50} color='#0296e5' />}

            <Text style={styles.footer}>"Este plicativo usa o TMDB e as APIs do TMDB, mas não é endossado, certificado ou aprovado pelo TMDB."</Text>
        </View>
    )
}