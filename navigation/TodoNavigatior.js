import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ActivityOverviewScreen from "../screens/Activity/ActivityOverviewScreen";
import ActivityAddScreen from "../screens/Activity/ActivityAddScreen";
import TargetOverviewScreen from "../screens/Target/TargetOverviewScreen";
import TargetAddScreen from "../screens/Target/TargetAddScreen";

const ActivityStack = createStackNavigator();
const TargetStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const ActivityTabScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      shifting={true}
      initialRouteName="ActivityOverview"
      activeColor="#e91e63"
    >
      <Tab.Screen
        name="ActivityOverview"
        component={ActivityStackScreen}
        options={{
          tabBarLabel: "Aktiviteler",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddActivity"
        component={ActivityAddScreen}
        options={{
          tabBarLabel: "Aktivite Ekle",
          tabBarColor: "#694fad",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TargetStackScreen = ({ navigation }) => {
  return (
    <TargetStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#009387",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <TargetStack.Screen
        name="TargetOverview"
        component={TargetOverviewScreen}
        options={{
          title: "Hedeflerin",
          headerLeft: () => {
            <Ionicons.Button
              name="ios-menu"
              size={25}
              onPress={() => {
                navigation.openDrawer();
              }}
            />;
          },
        }}
      />
      <TargetStack.Screen
        name="TargetAdd"
        component={TargetAddScreen}
        options={{
          title: "Yeni bir hedef belirle",
        }}
      />
    </TargetStack.Navigator>
  );
};

const ActivityStackScreen = ({ navigation }) => {
  return (
    <ActivityStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#009387",
        },
        headerTintColor: "#fff",
      }}
    >
      <ActivityStack.Screen
        name="ActivityOverview"
        component={ActivityOverviewScreen}
        options={{
          title: "Aktivitelerin",
          headerLeft: () => {
            <Ionicons.Button
              name="ios-menu"
              size={25}
              onPress={() => {
                navigation.openDrawer();
              }}
            />;
          },
        }}
      />
      <ActivityStack.Screen
        name="ActivityAdd"
        component={ActivityAddScreen}
        options={{
          title: "Yeni aktivite ekle",
        }}
      />
    </ActivityStack.Navigator>
  );
};

//hepsinin birleştiği yer
const TodoNavigatior = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Activity"
        component={ActivityTabScreen}
        options={{
          title: "Aktiviteler",
        }}
      />
      <Drawer.Screen
        name="Targets"
        component={TargetStackScreen}
        options={{
          title: "Hedeflerin",
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default TodoNavigatior;
