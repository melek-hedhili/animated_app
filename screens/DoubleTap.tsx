import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const DoubleTap = () => {
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });
  const scale = useSharedValue(0);
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }],
      left: heartPosition.x,
      top: heartPosition.y,
    };
  });

  const doubleTap = useCallback(
    (event: TapGestureHandlerGestureEvent) => {
      scale.value = withSpring(1, undefined, (isFinished) => {
        if (isFinished) scale.value = withSpring(0);
      });

      const { x, y } = event.nativeEvent;
      setHeartPosition({ x, y });
    },
    [scale]
  );
  return (
    <TapGestureHandler numberOfTaps={2} onActivated={doubleTap}>
      <Animated.View style={styles.container}>
        <Text style={{ textAlign: "center" }}>Double Tap Anywhere</Text>
        <Animated.View style={[styles.heartContainer, rStyle]}>
          <AntDesign name="heart" size={50} color="black" />
        </Animated.View>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default DoubleTap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heartContainer: {
    position: "absolute",
  },
});
