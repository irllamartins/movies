import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Details } from "../screens/Details";
import { TabRoutes } from "./tabs.routes";


const Stack = createNativeStackNavigator();

export const StackRoutes = () => {
    return <Stack.Navigator
        screenOptions={{
           // headerShown: false
        }}>
        <Stack.Screen name="Main" component={TabRoutes} options={{ headerShown: false }}/>
        <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
}