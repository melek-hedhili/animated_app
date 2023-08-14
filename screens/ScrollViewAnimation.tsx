import { StyleSheet } from "react-native";
import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Page from "../components/Page";
const WORDS = ["What's", "up", "mobile", "devs"];
const ScrollViewAnimation = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
      onScroll={scrollHandler}
    >
      {WORDS.map((title, index) => (
        <Page key={index} title={title} index={index} translateX={translateX} />
      ))}
    </Animated.ScrollView>
  );
};

export default ScrollViewAnimation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
