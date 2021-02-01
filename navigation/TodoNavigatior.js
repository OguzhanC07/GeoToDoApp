import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContent } from "../content/DrawerContent";
import { useTheme } from "react-native-paper";

import ActivityOverviewScreen from "../screens/Activity/ActivityOverviewScreen";
import ActivityAddScreen from "../screens/Activity/ActivityAddScreen";
import ActivityDetailScreen, {
  screenOptions as activityDetailScreenOptions,
} from "../screens/Activity/ActivityDetailScreen";
import ActivityMapScreen from "../screens/Activity/ActivityMapScreen";

import TargetOverviewScreen from "../screens/Target/TargetOverviewScreen";
import TargetAddScreen from "../screens/Target/TargetAddScreen";
import CompletedActivityScreen from "../screens/Activity/CompletedActivityScreen";

const ActivityStack = createStackNavigator();
const TargetStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const TopTap = createMaterialTopTabNavigator();

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
  const { colors } = useTheme();
  return (
    <ActivityStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background,
          elevation: 0,
        },
        headerTintColor: colors.text,
      }}
    >
      <ActivityStack.Screen
        name="ActivityOverview"
        component={ActitivityTopTabScreen}
        options={{
          title: "Aktiviteler",
          headerLeft: () => (
            <Ionicons
              style={{ paddingLeft: 5 }}
              name="ios-menu"
              size={25}
              color={colors.text}
              backgroundColor={colors.background}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <Ionicons
              style={{ paddingRight: 5 }}
              name="ios-add"
              size={25}
              color={colors.text}
              backgroundColor={colors.background}
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

const ActitivityTopTabScreen = ({ navigation }) => {
  return (
    <TopTap.Navigator>
      <TopTap.Screen
        name="ActivityOverview"
        component={ActivityOverviewScreen}
        options={{
          title: "Yapman Gerekenler",
        }}
      />
      <TopTap.Screen
        name="CompletedActivities"
        component={CompletedActivityScreen}
        options={{
          title: "Tamamladıkların",
        }}
      />
    </TopTap.Navigator>
  );
};

const ActivityTabScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      shifting={true}
      initialRouteName="ActivityOverview"
      activeColor="#fff"
    >
      <Tab.Screen
        name="ActivityOverview"
        component={ActivityStackScreen}
        options={{
          tabBarLabel: "Aktiviteler",
          tabBarColor: "#FF6347",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Harita"
        component={ActivityMapScreen}
        options={{
          tabBarLabel: "Harita",
          tabBarColor: "#d02860",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-aperture" color={color} size={26} />
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
