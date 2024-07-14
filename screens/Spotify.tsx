import React, { useState, useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import ShakeAndRipple from "../components/ShakeAndRipple";
import Heart from "./Heart";

interface HeartData {
  size: number;
  duration: number;
  color: string;
  x: number;
  y: number;
}

const Spotify: React.FC = () => {
  const [state, setState] = useState({ touch: true, start: false });

  const handlePress = useCallback(() => {
    setState((prev) => ({ touch: !prev.touch, start: !prev.start }));
    setTimeout(() => setState((prev) => ({ ...prev, start: false })), 1000);
  }, []);
  const shouldDisplayHearts = state.start && !state.touch;
  const heartsData: HeartData[] = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        size: scaleValue(i, 3),
        duration: 1000,
        color: "green",
        x: -60 + i * 12,
        y: -50 + scaleVertical(i, 2),
      })),
    []
  );

  return (
    <View style={styles.container}>
      <ShakeAndRipple
        touch={state.touch}
        start={state.start}
        onPress={handlePress}
      />
      {shouldDisplayHearts &&
        heartsData.map((heart, index) => (
          <Heart key={index} {...heart} start={state.start} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default Spotify;

function scaleValue(idx: number, total: number): number {
  const x = idx / total;
  const y = (Math.cos(2 * Math.PI * x) + 1) / 2.0;
  return 10 + 15 * y;
}

function scaleSaturation(idx: number, total: number): number {
  const x = idx / total;
  const y = Math.cos(Math.PI * x);
  return 0.3 + y;
}

function scaleVertical(idx: number, total: number): number {
  const x = idx / total;
  const y = Math.sin(Math.PI * x);
  return 5 + 30 * y;
}
