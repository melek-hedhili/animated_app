import { Dimensions, Platform, SafeAreaView, StyleSheet } from "react-native";
import React, { useCallback } from "react";
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
import Feather from "@expo/vector-icons/Feather";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const THRESHOLD = SCREEN_WIDTH / 3;
const Menu = () => {
  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = Math.max(event.translationX + context.x, 0);
    },
    onEnd: () => {
      if (translateX.value <= THRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 2);
      }
    },
  });
  const rStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 15],
      Extrapolate.CLAMP
    );
    const rtotate = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 3],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [
        { translateX: translateX.value },
        { perspective: 100 },
        { rotateY: `-${rtotate}deg` },
      ],
    };
  });
  const onPress = useCallback(() => {
    translateX.value > 0
      ? (translateX.value = withTiming(0))
      : (translateX.value = withTiming(SCREEN_WIDTH / 2));
  }, []);
  return (
    <SafeAreaView style={[styles.container, styles.safe]}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[{ backgroundColor: "white", flex: 1 }, rStyle]}>
          <Feather name="menu" size={32} color={"black"} onPress={onPress} />
        </Animated.View>
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
  safe: {
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
});
