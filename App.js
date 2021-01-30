import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { createStackNavigator } from "@react-navigation/stack";

import activityReducer from "./store/reducers/activity";
import authReducer from "./store/reducers/auth";

import StartupScreen from "./screens/StartupScreen";
import ContainerNavigator from "./navigation/ContainerNavigatior";

const rootReducer = combineReducers({
  activity: activityReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack.Screen name="Startup" component={StartupScreen} />
        <ContainerNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
