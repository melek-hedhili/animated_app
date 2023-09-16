import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler } from "react-native-reanimated";
interface ColorPickerProps extends LinearGradientProps {
  maxWidth?: number;
  onColorChanged?: (color: string | number) => void;
}

const ColorPickerComponent: React.FC<ColorPickerProps> = ({
  colors,
  start,
  end,
  style,
  maxWidth,
  onColorChanged,
}) => {
  const panGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({});
  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View>
        <LinearGradient colors={colors} start={start} end={end} style={style} />
        <View style={styles.picker} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ColorPickerComponent;
const CIRCLE_PICKER_SIZE = 45;
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;
const styles = StyleSheet.create({
  picker: {
    position: "absolute",
    backgroundColor: "#fff",
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  internalPicker: {
    width: INTERNAL_PICKER_SIZE,
    height: INTERNAL_PICKER_SIZE,
    borderRadius: INTERNAL_PICKER_SIZE / 2,
    borderWidth: 1.0,
    borderColor: "rgba(0,0,0,0.2)",
  },
});
