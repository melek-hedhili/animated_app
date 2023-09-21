import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ColorPickerComponent from "../components/ColorPickerComponent";

const COLORS = [
  "red",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "black",
  "white",
];

const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";

const { width } = Dimensions.get("window");

const CIRCLE_SIZE = width * 0.8;
const PICKER_WIDTH = width * 0.9;
const ColorPicker = () => {
  const pickedColor = useSharedValue<string | number>(COLORS[0]);
  const onColorChanged = useCallback((color: string | number) => {
    "worklet";
    pickedColor.value = color;
  }, []);
  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });
  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <ColorPickerComponent
          maxWidth={PICKER_WIDTH}
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
          onColorChanged={onColorChanged}
        />
      </View>
    </>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  gradient: { height: 40, width: PICKER_WIDTH, borderRadius: 20 },
});
