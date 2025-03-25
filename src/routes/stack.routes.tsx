import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Details } from "../screens/Details";
import { TabRoutes } from "./tabs.routes";
import { TouchableOpacity, View } from "react-native";
import { BookmarkSimple, Heart } from "phosphor-react-native";
import { useContext } from "react";
import { MovieContext } from "../context/MoviesContext";


const Stack = createNativeStackNavigator();

export const StackRoutes = () => {

    const context = useContext(MovieContext)


    return <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#242a32",
            },
            headerTintColor: "#fff",
        }}>
        <Stack.Screen name="Main"
            component={TabRoutes}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Details"
            component={Details}
            options={({ route }: any) => ({
                headerRight: () => {
                    const hasFavorite = context.favoriteMovies.includes(route.params?.movieId)
                    const hasWatchLater = context.watchLaterMovies.includes(route.params?.movieId)

                   return (<View style={{flexDirection: "row"}}>
                        <TouchableOpacity
                            onPress={() => {
                                hasFavorite ?
                                    context.removeFavoriteMovies(route.params?.movieId) :
                                    context.addFavoriteMovies(route.params?.movieId)
                            }}
                        >
                            <Heart size={24} weight={hasFavorite ? "fill" : "regular"} color="red" style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                hasWatchLater ?
                                    context.removeWatchLaterMovies(route.params?.movieId) :
                                    context.addWatchLaterMovies(route.params?.movieId)
                            }}
                        >
                            <BookmarkSimple size={24} weight={hasWatchLater? "fill" : "regular"} color="white" style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                    </View>
                    )
                },
            })} />
    </Stack.Navigator>
}