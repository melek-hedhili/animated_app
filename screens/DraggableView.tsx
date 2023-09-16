import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 2;
export type ContextInterface = {
  translateX: number;
  translateY: number;
};
const DraggableView = () => {
  const transalteX = useSharedValue(0);
  const transalteY = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextInterface
  >({
    onStart: (event, context) => {
      context.translateX = transalteX.value;
      context.translateY = transalteY.value;
    },
    onActive: (event, context) => {
      transalteX.value = event.translationX + context.translateX;
      transalteY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      console.log(Math.sqrt(transalteX.value ** 2 + transalteY.value ** 2));
      const distance = Math.sqrt(transalteX.value ** 2 + transalteY.value ** 2);
      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        transalteX.value = withSpring(0);
        transalteY.value = withSpring(0);
      }
    },
  });
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: transalteX.value },
        {
          translateY: transalteY.value,
        },
      ],
    };
  }, []);
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, reanimatedStyle]} />
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default DraggableView;

const styles = StyleSheet.create({
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgba(0,0,256,0.5)",
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: "rgba(0,0,256,0.5)",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
