import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"

export interface Genres {
    id: number
    name: string
}
interface TabsProps {
    readonly genres: Genres[]
    readonly active: Genres | undefined

    setValue(value: any): void
}
export const TabsGenres = (props: TabsProps) => {
    const { genres, active, setValue } = props
    return (
        <ScrollView
            horizontal={true}
            contentContainerStyle={{ flexGrow: 1 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ flex: 0 }}
        >
            <View style={styles.container}>
                {
                    genres.length > 0 && genres?.map((item: Genres, index: number) => {
                        return (
                            <TouchableOpacity
                                style={styles.button}
                                key={index}
                                onPress={() => setValue(item)}
                            >
                                <Text
                                    style={
                                         styles.text
                                    }
                                >{item.name}
                                </Text>
                                <View style={
                                    active?.id === item.id ?
                                        [styles.underline,styles.active ] :
                                        styles.underline}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </View></ScrollView>
    )
}

