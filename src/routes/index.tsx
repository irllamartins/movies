import { NavigationContainer } from '@react-navigation/native';
import { TabRoutes } from "./tabs.routes";

export const Routes = () => {
    return (
        <NavigationContainer>
            <TabRoutes />
        </NavigationContainer>
    )
}    