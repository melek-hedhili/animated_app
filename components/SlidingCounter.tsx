import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
const ICON_SIZE = 20;
const BUTTON_WIDTH = 170;
const MAX_SLIDE_OFFSET = BUTTON_WIDTH * 0.3;
const Clamp = (value: number, lowerBound: number, upperBound: number) => {
  "worklet";
  return Math.min(Math.max(lowerBound, value), upperBound);
};
const SlidingCounter = () => {
  const [count, setCount] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);
  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);
  const resetCount = useCallback(() => {
    setCount(0);
  }, []);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = Clamp(
        event.translationX + context.x,
        -MAX_SLIDE_OFFSET,
        MAX_SLIDE_OFFSET
      );
      translateY.value = Clamp(
        event.translationY,
        -MAX_SLIDE_OFFSET,
        MAX_SLIDE_OFFSET
      );
    },
    onEnd: () => {
      if (translateX.value === MAX_SLIDE_OFFSET) {
        runOnJS(increment)();
      } else if (translateX.value === -MAX_SLIDE_OFFSET) {
        runOnJS(decrement)();
      } else if (translateY.value === MAX_SLIDE_OFFSET) {
        runOnJS(resetCount)();
      }
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  const rPlusMinusIconStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.4, 0.8, 0.4]
    );

    const opacityY = interpolate(
      translateY.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0, 1, 0]
    );

    return {
      opacity: opacityX * opacityY,
    };
  }, []);

  const rCloseIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.8, 0, 0.8]
    );

    return {
      opacity,
    };
  }, []);
  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value * 0.1 },
        { translateY: translateY.value * 0.1 },
      ],
    };
  });
  return (
    <Animated.View style={[styles.container, rButtonStyle]}>
      <Animated.View style={[rPlusMinusIconStyle]}>
        <Feather name="minus" color={"white"} size={ICON_SIZE} />
      </Animated.View>
      <Animated.View style={[rCloseIconStyle]}>
        <AntDesign name="close" color={"white"} size={ICON_SIZE} />
      </Animated.View>
      <Animated.View style={[rPlusMinusIconStyle]}>
        <Feather name="plus" color={"white"} size={ICON_SIZE} />
      </Animated.View>
      <View style={styles.circleContainer}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.circle, rStyle]}>
            <Text style={styles.text}>{count}</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
};

export default SlidingCounter;

const styles = StyleSheet.create({
  container: {
    width: BUTTON_WIDTH,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#111111",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: "#232323",
    borderRadius: 25,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
