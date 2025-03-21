import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookmarkSimple, House, MagnifyingGlass } from "phosphor-react-native";

import { Home } from "../screens/Home";
import { MyList } from "../screens/MyList";
import { Search } from "../screens/Search";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#242a32",
          height: 78,
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: "#0296e5",
        },
        headerShown: false,
        tabBarActiveTintColor: "#0296e5",
        tabBarInactiveTintColor: "#67686d",
        tabBarShowLabel: false,
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

      {/*<Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarButton: () => null,
        }}
      />*/}

      <Tab.Screen
        name="MyList"
        component={MyList}
        options={{
         tabBarIcon: ({ color }) => (
            <BookmarkSimple color={color} size={30} weight="light" />
          )
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <MagnifyingGlass color={color} size={30} weight="light" />
          )
        }}   
      />
    </Tab.Navigator>
  )
}