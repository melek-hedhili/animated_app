import { StyleSheet, View } from "react-native";
import Spotify from "./Spotify";

const Switch = () => {
  return (
    <View style={styles.container}>
      <Spotify onChange={(like) => console.log(like)} size={15} color="green" />
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
