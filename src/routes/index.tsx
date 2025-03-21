import { NavigationContainer } from '@react-navigation/native';
import { TabRoutes } from "./tabs.routes";
import { StackRoutes } from './stack.routes';

export const Routes = () => {
    return (
        <NavigationContainer>
            <StackRoutes />
        </NavigationContainer>
    )
}    