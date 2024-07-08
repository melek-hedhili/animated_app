import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const THRESHOLD = SCREEN_WIDTH / 3;
const Menu = () => {
  const transalteX = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => {
      context.x = transalteX.value;
    },
    onActive: (event, context) => {
      if (event.translationX > 0)
        transalteX.value = event.translationX + context.x;
    },
    onEnd: (event, context) => {
      if (event.translationX <= THRESHOLD) {
        transalteX.value = withTiming(0);
      } else {
        transalteX.value = withTiming(SCREEN_WIDTH / 2);
      }
    },
  });
  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      transalteX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 3],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      transalteX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 1],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [
        { perspective: 100 },
        { translateX: transalteX.value },
        { rotateY: `${rotate}deg` },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[{ backgroundColor: "white", flex: 1 }, rStyle]}
        />
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e23",
  },
});
