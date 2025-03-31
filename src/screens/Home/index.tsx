import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native"
import { styles } from "./styles"
import { MagnifyingGlass } from "phosphor-react-native"
import { useEffect, useRef, useState } from "react"
import { listGenresService, listMovieGenresService, listMoviesService, searchMoviesService } from "../../services/api"
import { CardMovies } from "../../components/CardMovies"
import { useNavigation } from "@react-navigation/native"
import { ShowCaseMovies } from "../../components/ShowCaseMovies"
import { TabsGenres } from "../../components/tabs"
import { Genres, MovieDetails } from "../../model/movie"


export function Home() {
    const [discoveryMovies, setDiscoveryMovies] = useState<MovieDetails[]>([])
    const [searchResultMovies, setSearchResultMovies] = useState<MovieDetails[]>([])
    const [listGenres, setListGenres] = useState<Genres[]>([{ id: 0, name: "Todos" }])
    const [activeGenres, setActiveGenres] = useState<Genres>({ id: 0, name: "Todos" })
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [noResult, setnoResult] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const navigation = useNavigation()
    const showCaseListRef = useRef<FlatList>(null);
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        loadMoreData()
        loadGenrer()
    }, [])

    useEffect(() => {
        listMoviesGenresActive()
        resetList()
    }, [activeGenres])

    const resetList = () => {
        // Volta para o início da lista
        listRef.current?.scrollToOffset({ animated: true, offset: 0 });
        showCaseListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    };

    const listMoviesGenresActive = async () => {
        if (activeGenres.id > 0 && !search) {
            const listMoviesActives = await listMovieGenresService(activeGenres.id)
            setDiscoveryMovies(listMoviesActives)
        } else {
            const listMoviesActives = await listMoviesService(page)
            setDiscoveryMovies(listMoviesActives)
        }
    }

    const loadMoreData = async () => {
        setLoading(true)
        const response = await listMoviesService(page)

        /* const uniqueMovies = discoveryMovies.filter((movie:Movie, index) =>
             -1 !== response.findIndex((response:Movie) => response.id === movie.id)
         )*/
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
        setPage(1)
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


    const movieData = search.length > 2 ? searchResultMovies : discoveryMovies

    const renderMoviesItem = (({ item }: { item: MovieDetails }) => {
        return <CardMovies
            data={item}
            onPress={() => navigation.navigate("Details", { movieId: item.id })}
        />;
    });

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
            {
                noResult && search.length > 0 && <Text style={styles.noResult}>
                    Nenhum filme encontrado "{search}"
                </Text>
            }
            {loading ? <ActivityIndicator size={50} color='#0296e5' /> : <>
                <View >
                    {!search && <FlatList
                        key={"flat_1"}
                        ref={showCaseListRef}
                        data={discoveryMovies?.slice(0, 10)}
                        renderItem={({ item, index }: { item: MovieDetails, index: number }) => {
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
                        ref={listRef}
                        data={!search ? movieData?.slice(10) : movieData}
                        renderItem={renderMoviesItem}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index: number) => `movie_${item.id.toString()}_${index}`}
                        contentContainerStyle={{
                            padding: 35,
                            paddingBottom: 600
                        }}
                        key={search ? 'vertical' : 'horizontal'}
                        horizontal={!search}
                        numColumns={search ? 3 : 1}
                        onEndReached={() => !search && loadMoreData()  }
                        onEndReachedThreshold={0.5}
                    />
                </View>
            </>
            }
            <Text style={styles.footer}>"Este plicativo usa o TMDB e as APIs do TMDB, mas não é endossado, certificado ou aprovado pelo TMDB."</Text>


        </View >
    )
}