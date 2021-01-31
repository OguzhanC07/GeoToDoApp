import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import StartupScreen from "../screens/StartupScreen";
import AuthNavigatior from "./AuthNavigatior";
import TodoNavigatior from "./TodoNavigatior";

const Stack = createStackNavigator();

const ContainerNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      {isAuth ? <TodoNavigatior /> : <AuthNavigatior />}
    </NavigationContainer>
  );
};

export default ContainerNavigator;
