import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
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
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const adjustTranslateX = useDerivedValue(() => {
    return Math.max(
      0,
      Math.min(translateX.value, (maxWidth || 0) - CIRCLE_PICKER_SIZE)
    );
  });

  const onEnd = useCallback(() => {
    "worklet";
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
  }, []);
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart(_, context) {
      context.x = adjustTranslateX.value;
      // translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
      // scale.value = withSpring(1.2);
    },
    onActive(event, context) {
      translateX.value = event.translationX + context.x;
    },
    onEnd,
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: adjustTranslateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });
  const TapGestureEvent = useAnimatedGestureHandler<
    TapGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart(event, context) {
      translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
      scale.value = withSpring(1.2);
      translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE);
    },

    onEnd,
  });
  const rInternalPickerStyle = useAnimatedStyle(() => {
    const inputRange = colors.map(
      (_, index) => (index / colors.length) * (maxWidth || 0)
    );
    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      colors
    );
    onColorChanged?.(backgroundColor);

    return {
      backgroundColor,
    };
  });
  return (
    <TapGestureHandler onGestureEvent={TapGestureEvent}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View>
            <LinearGradient
              colors={colors}
              start={start}
              end={end}
              style={style}
            />
            <Animated.View style={[styles.picker, rStyle]}>
              <Animated.View
                style={[styles.internalPicker, rInternalPickerStyle]}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
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
