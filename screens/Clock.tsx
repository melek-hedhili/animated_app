import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { N } from "../constants/constants";
import Square from "../components/Square";

const Clock = () => {
  return (
    <View style={styles.container}>
      {new Array(N).fill(0).map((_, index) => (
        <Square index={index} key={index} />
      ))}
    </View>
  );
};

export default Clock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
});
