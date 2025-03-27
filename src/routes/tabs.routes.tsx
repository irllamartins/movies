import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookmarkSimple, Heart, House, MagnifyingGlass } from "phosphor-react-native";

import { Home } from "../screens/Home";
import { MyList } from "../screens/MyList";
import { Favorite } from "../screens/Favorite";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#242a32",
          height: 78,
          alignItems: "center",
          borderTopWidth: 2,
          borderTopColor: "#0296e5",
        },
        headerShown: false,
        tabBarActiveTintColor: "#0296e5",
        tabBarInactiveTintColor: "#67686d",
       // tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House color={color} size={30} weight="light" />
          )
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({ color }) => (
            <Heart color={color} size={30} weight="light" />
          )
        }}
      />

      <Tab.Screen
        name="MyList"
        component={MyList}
        options={{
         tabBarIcon: ({ color }) => (
            <BookmarkSimple color={color} size={30} weight="light" />
          )
        }}
      />

    </Tab.Navigator>
  )
}