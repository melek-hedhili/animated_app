import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface HeartProps {
  size: number;
  color: string;
  x: number;
  y: number;
  start: boolean;
}

const Heart: React.FC<HeartProps> = ({ size, color, x, y, start }) => {
  const animatedValue = useSharedValue(0);

  React.useEffect(() => {
    if (start) {
      animatedValue.value = withTiming(1, { duration: 1000 });
    } else {
      animatedValue.value = 0;
    }
  }, [start]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: animatedValue.value * x },
      { translateY: animatedValue.value * y },
    ],
    opacity: 1 - animatedValue.value,
  }));

  return (
    <Animated.View style={[styles.heart, animatedStyle]}>
      <AntDesign name="heart" size={size} color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heart: {
    position: "absolute",
  },
});

export default Heart;
