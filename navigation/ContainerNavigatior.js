import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import StartupScreen from "../screens/StartupScreen";
import AuthNavigatior from "./AuthNavigatior";
import TodoNavigatior from "./TodoNavigatior";

const ContainerNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => !!state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      {isAuth && <TodoNavigatior />}
      {!isAuth && didTryAutoLogin && <AuthNavigatior />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default ContainerNavigator;
