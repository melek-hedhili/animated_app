import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { width, height } = Dimensions.get("window");
const SIZE = width * 0.7;
const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  console.log([(index - 1) * width, index * width, (index + 1) * width]);
  const reanimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [{ scale: scale }],
    };
  }, []);
  const reanimatedTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY: translateY }],
    };
  }, []);
  return (
    <View
      style={[
        styles.pageContainer,
        { width, height, backgroundColor: `rgba(0,0,256,0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, reanimatedStyle]} />
      <Animated.View style={[{ position: "absolute" }, reanimatedTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgba(0,0,256,0.5)",
  },
  text: {
    fontSize: 70,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
