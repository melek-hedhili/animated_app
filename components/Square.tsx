import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { N, SQUARE_SIZE } from "../constants/constants";
interface SquarePorops {
  index: number;
}
const Square: FC<SquarePorops> = ({ index }) => {
  return (
    <View
      key={index}
      style={{
        height: SQUARE_SIZE,
        backgroundColor: "white",
        aspectRatio: 1,
        opacity: (index + 1) / N,
        position: "absolute",
      }}
    />
  );
};

export default Square;

const styles = StyleSheet.create({});
