import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Intro from "../screens/Intro";
import DraggableView from "../screens/DraggableView";
import ScrollViewAnimation from "../screens/ScrollViewAnimation";
import Home from "../screens/Home";
const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="DraggableView" component={DraggableView} />
        <Stack.Screen
          name="ScrollViewAnimation"
          component={ScrollViewAnimation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
