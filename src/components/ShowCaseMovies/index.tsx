import { Image, Pressable, Text, View } from "react-native"
import { styles } from "./styles"

interface Movie {
    id: number
    poster_path: string
}

interface Props {
    data: Movie
    position: number
    onPress?: () => void
}

export const ShowCaseMovies = ({ data, position, ...rest }: Props) => {

    return (
        <Pressable {...rest}
            style={styles.cardShowcase}
        >  
        
            <Image source={{
                uri: `https://image.tmdb.org/t/p/w780/${data.poster_path}`
            }}
                style={styles.cardMoviesShowcase }
            />
          <Text style={styles.position}>{position+1}</Text>
        </Pressable>
    )
}