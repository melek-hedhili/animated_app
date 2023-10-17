import {
  Platform,
  StyleSheet,
  View,
  Image,
  ViewStyle,
  StyleProp,
  ImageStyle,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
const CIRCLE_SIZE = 40;
const TOGGLE_WIDTH = 150;
const TOGGLE_HEIGHT = 50;
const MOON_COLOR = "#DEE5F3";
const SUN_COLOR = "#FFC187";
const CLEAR_SKY_COLOR = "#6CB8FF";
const DARK_SKY_COLOR = "#1F2533";
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(Pressable);
const colors = {
  dark: {
    background: "#1E1E1E",
    circle: "#252525",
    text: "#F8F8F8",
  },
  light: {
    background: "#F8F8F8",
    circle: "#FFF",
    text: "#1E1E1E",
  },
};
const SWITCH_TRACK_COLOR = {
  true: "rgba(256,0,256,0.2)",
  false: "rgba(0,0,0,0.1)",
};

type Theme = "light" | "dark";
const Clamp = (value: number, lowerBound: number, upperBound: number) => {
  "worklet";
  return Math.min(Math.max(lowerBound, value), upperBound);
};
const Switch = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const progress = useDerivedValue(() =>
    theme === "dark" ? withTiming(1) : withTiming(0)
  );
  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart(_, context) {
      context.x = translateX.value;
    },
    onActive(event, context) {
      translateX.value = Clamp(event.translationX + context.x, 0, 100);
    },
    onEnd(event, _) {
      if (event.translationX > 0) {
        translateX.value = withSpring(100, { damping: 15 });
      } else {
        translateX.value = withSpring(0, { damping: 15 });
      }
    },
    
  });
  const onPress = () => {
    translateX.value = withSpring(translateX.value === 0 ? 100 : 0, {
      damping: 15,
    });
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [0, 100],
      [SUN_COLOR, MOON_COLOR]
    );
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
      backgroundColor,
      //shadowColor: backgroundColor,
    };
  });
  const rDot = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [0, 100],
      [SUN_COLOR, DARK_SKY_COLOR]
    );
    return {
      backgroundColor,
    };
  });
  const rToggle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [0, 100],
      [CLEAR_SKY_COLOR, DARK_SKY_COLOR]
    );
    return {
      backgroundColor,
    };
  });
  const rCloud1 = useAnimatedStyle(() => {
    const translateCloud = withSpring(
      interpolate(translateX.value, [0, 50], [0, 100])
    );
    return {
      transform: [{ translateX: translateCloud }],
    };
  });
  const rCloud2 = useAnimatedStyle(() => {
    const translateCloud = withSpring(
      interpolate(translateX.value, [0, 50], [0, -100])
    );
    return {
      transform: [{ translateX: translateCloud }],
    };
  });
  const rStar = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, 100], [0, 1]);
    const translateY = withSpring(
      interpolate(translateX.value, [0, 100], [-50, 3]),
      { damping: 15 }
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  });
  const Cloud = ({ style }: { style?: any }) => (
    <Animated.Image
      source={require("../assets/cloud.png")}
      style={[styles.cloud, style]}
      resizeMode="stretch"
    />
  );
  const Star = ({ style }: { style?: any }) => (
    <Animated.Image
      source={require("../assets/stars.png")}
      style={[styles.star, style, rStar]}
      resizeMode="contain"
    />
  );
  const rContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.light.background, colors.dark.background]
    );
    return {
      backgroundColor,
    };
  });
  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      <Animated.View style={[styles.toggle, rToggle]}>
        <Cloud style={[{ bottom: -15, opacity: 0.8, zIndex: 99 }, rCloud1]} />
        <Cloud style={[{ bottom: -5, opacity: 0.5, left: 50 }, rCloud2]} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Star />
          <Star />
        </View>

        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <AnimatedTouchableOpacity
            onPress={onPress}
            style={[styles.toggleCircle, rStyle]}
          >
            <Animated.View style={[styles.dot, rDot]} />
          </AnimatedTouchableOpacity>
        </PanGestureHandler>
      </Animated.View>
    </Animated.View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#1F1F1F",
  },
  toggle: {
    width: TOGGLE_WIDTH,
    height: TOGGLE_HEIGHT,
    borderRadius: 25,
    backgroundColor: "#ccc",
    justifyContent: "center",
    overflow: "hidden",
  },
  toggleCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 25,
    backgroundColor: SUN_COLOR,
    position: "absolute",
    left: 5,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    // shadowColor: "white",
    // shadowRadius: 100, // Adjust as needed
    // shadowOffset: { width: 100, height: 100 }, // Adjust as needed
    // shadowOpacity: 0.5, // Adjust as needed
    // elevation: 10, // Android shadow
    overflow: "hidden",
  },
  dot: {
    width: CIRCLE_SIZE * 0.85,
    height: CIRCLE_SIZE * 0.85,
    borderRadius: 25,
    alignSelf: "flex-start",
    right: 4,
  },
  cloud: {
    width: TOGGLE_WIDTH,
    height: 40,
    alignSelf: "center",
    position: "absolute",
  },
  star: {
    width: 50,
    height: 50,
  },
});
