import { StyleSheet, View } from "react-native";
import React from "react";
import { ImageProps, Image } from "expo-image";
import { ListItemWidth } from "./CircularCarouselComponent";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
type CircularCarouselListItemProps = {
  imageSrc: ImageProps["source"];
  index: number;
  contentOffset: Animated.SharedValue<number>;
};
const CircularCarouselListItem: React.FC<CircularCarouselListItemProps> = ({
  imageSrc,
  index,
  contentOffset,
}) => {
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      index - 2 * ListItemWidth,
      index - 1 * ListItemWidth,
      index * ListItemWidth,
      (index + 1) * ListItemWidth,
      (index + 2) * ListItemWidth,
    ];
    const outputRange = [
      0,
      -ListItemWidth / 3,
      -ListItemWidth / 2,
      -ListItemWidth / 3,
      0,
    ];
    const translateY = interpolate(
      contentOffset.value,
      inputRange,
      outputRange,
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { translateY: translateY },
        { translateX: ListItemWidth / 2 + ListItemWidth },
      ],
    };
  });
  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Image source={imageSrc} style={styles.image} />
    </Animated.View>
  );
};

export default CircularCarouselListItem;

const styles = StyleSheet.create({
  container: {
    width: ListItemWidth,

    aspectRatio: 1,
    // elevation: 5,
    // shadowOpacity: 0.2,
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowRadius: 20,
  },
  image: {
    margin: 3,
    height: ListItemWidth,
    width: ListItemWidth,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: "white",
  },
});
