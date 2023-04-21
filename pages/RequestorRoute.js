import { StatusBar } from "expo-status-bar";
import { LogBox, Platform } from "react-native";
import { useContext } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./ReqPage/Home";
import TasksPage from "./ReqPage/TasksPage";
import TasksCompleted from "./ReqPage/TasksCompleted";
import TasksOnProcess from "./ReqPage/TasksOnProcess";
import Notification from "./ReqPage/Notification";
import Profile from "./ReqPage/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Details from "./ReqPage/Details";


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function RequestorRoute(props) {

  

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  function TaskList() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="All Tasks"
          component={TaskIsCompleted}
          options={{
            headerStyle: {
              backgroundColor: "#008c8c",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  function NotificationStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerStyle: {
              backgroundColor: "#008c8c",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  function TaskIsCompleted() {
    return (
      <TopTab.Navigator>
        <TopTab.Screen name="All" component={TasksPage} />
        <TopTab.Screen name="On Process" component={TasksOnProcess} />
        <TopTab.Screen name="Completed" component={TasksCompleted} />
      </TopTab.Navigator>
    );
  }

  function HomeTabs() {
    return (
      <Tab.Navigator
        activeColor="#2895e7ff"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: "#fff",
        height: Platform.OS === "ios" ? 90 : 70,
        paddingBottom: Platform.OS === "ios" ? 10 : 10,
      }}
        shifting={true}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={23} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Tasks"
          component={TaskList}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={23} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="NotificationStack"
          component={NotificationStack}
          options={{
            tabBarLabel: "Notification",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications-outline" size={23} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={{ onLogout: props.onLogout }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={23} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Hands On"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerStyle: {
              backgroundColor: "#008c8c",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default RequestorRoute;
