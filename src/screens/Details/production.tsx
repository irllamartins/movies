import { FlatList, Image, Text, View } from "react-native"
import { styles } from "./styles"
import { MovieDetails } from "../../model/movie"
import { Credits, Person, ProductionCompanies } from "../../model/credit"

interface Props {
    movieId: number
    movieDetails: MovieDetails | undefined | null
    creditsMovie: Credits | undefined
}


export const Production = (props: Props) => {
    const { movieDetails, creditsMovie } = props
    return (
        <View style={styles.about}>
            <View style={styles.produceContainer}>
                <Text style={styles.aboutText}>Atores</Text>
                <View style={styles.underline} />
                <FlatList
                    // ref={listRef}
                    data={creditsMovie?.cast}
                    renderItem={({ item }: { item: Person }) => {
                        return <View style={styles.infoPersonConatiner} >
                            <Image source={{
                                uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`
                            }}
                                style={styles.personImage}
                            />
                            <Text style={styles.infoCharacterText}>{item.character}</Text>
                            <Text style={styles.infoPersonText}>{item.name}</Text>
                        </View>
                    }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index: number) => `cast_${item.id.toString()}_${index}`}
                    contentContainerStyle={{
                        padding:20
                    }}
                    key={'cast'}
                    horizontal={true}
                   // numColumns={2}
                />
            </View>
            <View >
                <Text style={styles.aboutText}>Produção</Text>
                <View style={styles.underline} />
            </View>

            <FlatList
                    // ref={listRef}
                    data={creditsMovie?.crew}
                    renderItem={({ item }: { item: Person }) => {
                        return <View style={styles.infoPersonConatiner} >
                            <Image source={{
                                uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`
                            }}
                                style={styles.personImage}
                            />
                            <Text style={styles.infoPersonText}>{item.name}</Text>
                            <Text style={styles.infoCharacterText}>{item.job}</Text>
                        </View>
                    }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index: number) => `crew_${item.id.toString()}_${index}`}
                    contentContainerStyle={{
                        padding:20
                    }}
                    key={'crew'}
                    horizontal={true}
                   // numColumns={2}
                />
             <View >
                <Text style={styles.aboutText}>Empresas</Text>
                <View style={styles.underline} />
            </View>
            <FlatList
                    // ref={listRef}
                    data={movieDetails?.production_companies}
                    renderItem={({ item }: { item: ProductionCompanies }) => {
                        return <View style={styles.infoPersonConatiner} >
                            <Image source={{
                                uri: `https://image.tmdb.org/t/p/w500${item.logo_path}`
                            }}
                            style={styles.produceImage}
                             resizeMode="contain"
                            />
                            <Text style={styles.infoCharacterText}>{item.name}</Text>
                            <Text style={styles.aboutText}> {item.origin_country}</Text>
                        </View>
                    }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index: number) => `production_companies_${item.id.toString()}_${index}`}
                    contentContainerStyle={{
                        padding:20
                    }}
                    key={'production_companies'}
                    horizontal={true}
                   // numColumns={2}
                />

        </View>
    )
}