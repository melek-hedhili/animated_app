import { useState, useCallback, FC, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import ShakeAndRipple from "../components/ShakeAndRipple";
import Heart from "./Heart";
type SpotifyProps = {
  onChange: (value: boolean) => void;
  size?: number;
  color?: string;
};
const Spotify: FC<SpotifyProps> = ({ onChange, color, size = 40 }) => {
  const [state, setState] = useState({ touch: true, start: false });
  const shouldDisplayHearts = state.start && !state.touch;

  const handlePress = useCallback(() => {
    setState((prev) => ({ touch: !prev.touch, start: !prev.start }));
    setTimeout(() => setState((prev) => ({ ...prev, start: false })), 1000);
    onChange?.(state.touch);
  }, [state]);

  const hearts = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        size: scaleValue(i, 3),
        duration: 1000,
        color: color || "red",
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
        color={color}
        size={size || 40}
      />
      {shouldDisplayHearts &&
        hearts.map((heart, index) => (
          <Heart key={index} {...heart} start={state.start} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Spotify;

function scaleValue(idx: number, total: number): number {
  const x = idx / total;
  const y = (Math.cos(2 * Math.PI * x) + 1) / 2.0;
  return 10 + 15 * y;
}

function scaleVertical(idx: number, total: number): number {
  const x = idx / total;
  const y = Math.sin(Math.PI * x);
  return 5 + 30 * y;
}
