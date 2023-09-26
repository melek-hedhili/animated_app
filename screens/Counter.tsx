import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SlidingCounter from "../components/SlidingCounter";

const Counter = () => {
  return (
    <View style={styles.container}>
      <SlidingCounter />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
