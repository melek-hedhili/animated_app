import { StyleSheet, Text, View, ViewToken } from "react-native";
import React, { FC } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: {
    id: number;
  };
};
const FlatListItems: FC<ListItemProps> = ({ item, viewableItems }) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItems) => viewableItems.item.id === item.id)
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [{ scale: withTiming(isVisible ? 1 : 0) }],
    };
  });
  return <Animated.View style={[styles.item, rStyle]} />;
};

export default FlatListItems;

const styles = StyleSheet.create({
  item: {
    height: 80,
    width: "90%",
    backgroundColor: "#78CAD2",
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 20,
  },
});
