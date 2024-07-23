import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ShakeAndRippleProps {
  touch: boolean;
  start: boolean;
  onPress?: () => void;
  size?: number;
  color?: string;
}

const ShakeAndRipple: React.FC<ShakeAndRippleProps> = ({
  touch,
  start,
  onPress,
  size = 40,
  color = "red",
}) => {
  const shake = useSharedValue(0);
  const rippleScale = useSharedValue(0);

  React.useEffect(() => {
    if (touch && start) {
      shake.value = withRepeat(withTiming(1, { duration: 100 }), 4, true);
    } else if (!touch && start) {
      rippleScale.value = withTiming(1.5, { duration: 600 }, () => {
        rippleScale.value = 0;
      });
    }
  }, [touch, start]);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value * (size / 4) }],
  }));

  const rippleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: 1 - rippleScale.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.ripple, rippleStyle, { borderColor: color }]}
      />
      <TouchableOpacity onPress={onPress} disabled={start}>
        <Animated.View
          style={[
            {
              width: size,
              height: size,
            },
            shakeStyle,
          ]}
        >
          <AntDesign
            name={touch ? "hearto" : "heart"}
            size={size}
            color={touch ? "black" : color}
          />
        </Animated.View>
      </TouchableOpacity>
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
  },
});

export default ShakeAndRipple;
