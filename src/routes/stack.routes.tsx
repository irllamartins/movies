import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Details } from "../screens/Details";
import { TabRoutes } from "./tabs.routes";
import { TouchableOpacity } from "react-native";
import { BookmarkSimple } from "phosphor-react-native";


const Stack = createNativeStackNavigator();

export const StackRoutes = () => {
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
            options={({ /*navigator*/ }) => ({
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => console.log("Favorito clicado!")}
                    >
                        <BookmarkSimple size={24} color="white" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                ),
            })} />
    </Stack.Navigator>
}