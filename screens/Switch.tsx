import { StyleSheet, View } from "react-native";
import SpotifyHeartTest from "./test";

const Switch = () => {
  return (
    <View style={styles.container}>
      <SpotifyHeartTest />
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
