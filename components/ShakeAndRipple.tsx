import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

interface ShakeAndRippleProps {
  touch: boolean;
  start: boolean;
}

const ShakeAndRipple: React.FC<ShakeAndRippleProps> = ({ touch, start }) => {
  const shake = useSharedValue(0);
  const rippleScale = useSharedValue(0);

  React.useEffect(() => {
    if (touch) {
      shake.value = withRepeat(withTiming(1, { duration: 100 }), 4, true);
    } else {
      rippleScale.value = withTiming(1.5, { duration: 600 }, () => {
        rippleScale.value = 0;
      });
    }
  }, [touch]);

  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shake.value * 10 }],
    };
  });

  const rippleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: rippleScale.value }],
      opacity: 1 - rippleScale.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ripple, rippleStyle]} />
      <Animated.View style={[styles.heartIcon, shakeStyle]}>
        {/* <HeartIcon fill="transparent" size={40} /> */}
        {!touch ? (
          <>
            <AntDesign name="heart" size={40} color="green" />
          </>
        ) : (
          <>
            <AntDesign name="hearto" size={40} color="black" />
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  heartIcon: {
    width: 40,
    height: 40,
  },
  ripple: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "green",
  },
});

export default ShakeAndRipple;
