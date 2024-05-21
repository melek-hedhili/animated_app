import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import HeartIcon from "../assets/svg/HeartIcon";

interface HeartProps {
  size: number;
  duration: number;
  color: string;
  x: number;
  y: number;
  start: boolean;
}

const Heart: React.FC<HeartProps> = ({
  size,
  duration,
  color,
  x,
  y,
  start,
}) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    if (start) {
      translateY.value = withTiming(y, {
        duration,
        easing: Easing.in(Easing.ease),
      });
      opacity.value = withTiming(0, { duration });
    }
  }, [start, duration, y]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.heart,
        animatedStyle,
        {
          left: "50%",
          top: "50%",
          marginLeft: x,
          marginTop: -x,
        },
      ]}
    >
      <HeartIcon fill={color} size={size} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heart: {
    position: "absolute",
    borderRadius: 50,
  },
});

export default Heart;
