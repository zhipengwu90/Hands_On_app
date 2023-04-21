import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./HelpPage/Home";
import TasksPage from "./HelpPage/TasksPage";
import TasksCompleted from "./HelpPage/TasksCompleted";
import TasksOnProcess from "./HelpPage/TasksOnProcess";
import Notification from "./HelpPage/Notification";
import Profile from "./HelpPage/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Details from "./HelpPage/Details";
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function HelperRoute(props) {
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
              backgroundColor: "#D35D5D",
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
              backgroundColor: "#D35D5D",
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
        barStyle={{ backgroundColor: "#fff" }}
        shifting={true}
        screenOptions={{
          tabBarActiveTintColor: "#D35D5D",
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 10 : 10,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={23} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Tasks"
          component={TaskList}
          options={{
            headerStyle: {
              backgroundColor: "#D35D5D",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
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
            headerStyle: {
              backgroundColor: "#D35D5D",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications-outline" size={23} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          initialParams={{ onLogout: props.onLogout }}
          component={Profile}
          options={{
            headerShown: false,
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
          name="HomeScreen"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerStyle: {
              backgroundColor: "#D35D5D",
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

export default HelperRoute;
