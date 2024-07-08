import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Intro from "../screens/Intro";
import DraggableView from "../screens/DraggableView";
import ScrollViewAnimation from "../screens/ScrollViewAnimation";
import Home, { screens } from "../screens/Home";
import SwitchTheme from "../screens/SwitchTheme";
import Pinch from "../screens/Pinch";
import DoubleTap from "../screens/DoubleTap";
import ColorPicker from "../screens/ColorPicker";
import ProgressCircle from "../screens/ProgressCircle";
import SwipeToDelete from "../screens/SwipeToDelete";

import Counter from "../screens/Counter";
import Clock from "../screens/Clock";
import FlatListScrollAnimation from "../screens/FlatListScrollAnimation";
import Tarots from "../screens/Tarots";
import Switch from "../screens/Switch";
import CircularCarousel from "../screens/CircularCarousel";
import Spotify from "../screens/Spotify";

const componentMap: any = {
  Intro,
  DraggableView,
  ScrollViewAnimation,
  SwitchTheme,
  Pinch,
  DoubleTap,
  ColorPicker,
  ProgressCircle,
  SwipeToDelete,
  Counter,
  Clock,
  FlatListScrollAnimation,
  Tarots,
  Switch,
  CircularCarousel,
  Spotify,
};
const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        {screens.map((screenName, index) => (
          <Stack.Screen
            key={index}
            name={screenName}
            component={componentMap[screenName]}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
