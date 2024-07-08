import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CIRCULAR_CAROUSEL_DATA } from "../constants/constants";
import CircularCarouselComponent from "../components/CircularCarouselComponent";

const CircularCarousel = () => {
  return (
    <View style={styles.container}>
      <CircularCarouselComponent data={CIRCULAR_CAROUSEL_DATA} />
    </View>
  );
};

export default CircularCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
