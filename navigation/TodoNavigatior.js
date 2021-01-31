import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { DrawerContent } from "../content/DrawerContent";

import ActivityOverviewScreen from "../screens/Activity/ActivityOverviewScreen";
import ActivityAddScreen from "../screens/Activity/ActivityAddScreen";
import ActivityDetailScreen, {
  screenOptions as activityDetailScreenOptions,
} from "../screens/Activity/ActivityDetailScreen";
import TargetOverviewScreen from "../screens/Target/TargetOverviewScreen";
import TargetAddScreen from "../screens/Target/TargetAddScreen";

const ActivityStack = createStackNavigator();
const TargetStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

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
      />
      <TargetStack.Screen name="TargetAdd" component={TargetAddScreen} />
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
          title: "Aktiviteler",
          headerLeft: () => (
            <Ionicons
              style={{ paddingLeft: 5 }}
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <Ionicons
              style={{ paddingRight: 5 }}
              name="ios-add"
              size={25}
              backgroundColor="#009387"
              onPress={() => navigation.navigate("ActivityAdd")}
            />
          ),
        }}
      />
      <ActivityStack.Screen
        name="ActivityAdd"
        component={ActivityAddScreen}
        options={{
          title: "Yeni aktivite ekle",
        }}
      />
      <ActivityStack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={activityDetailScreenOptions}
      />
    </ActivityStack.Navigator>
  );
};

const ActivityTabScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      // shifting={true}
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
    </Tab.Navigator>
  );
};

//hepsinin birleştiği yer
const TodoNavigatior = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Activity"
        component={ActivityTabScreen}
        options={{
          title: "Aktiviteler",
        }}
      />
      <Drawer.Screen
        name="Target"
        component={TargetStackScreen}
        options={{
          title: "Hedeflerin",
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default TodoNavigatior;
