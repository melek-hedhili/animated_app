import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import ShakeAndRipple from "../components/ShakeAndRipple";

const Spotify = () => {
  const [touch, setTouch] = useState(false);
  const [start, setStart] = useState(false);

  const handlePress = () => {
    setTouch((prev) => !prev);
    setStart((prev) => !prev);
    setTimeout(() => setStart(false), 1000); // Reset start after animation duration
  };
  const heartsData = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * 2 * Math.PI;
    return {
      size: 20 + Math.cos(angle) * 10,
      duration: 1000,
      color: `rgba(255, 0, 0, ${0.5 + Math.cos(angle) * 0.5})`,
      x: Math.cos(angle) * 30,
      y: -Math.sin(angle) * 30,
    };
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Press</Text>
      </TouchableOpacity>
      <ShakeAndRipple touch={touch} start={start} />
      {/* <View
        style={{
          backgroundColor: "green",
          width: "100%",
          height: 200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {start &&
          heartsData.map((heart, index) => (
            <Heart key={index} {...heart} start={start} />
          ))}
      </View> */}
    </View>
  );
};

export default Spotify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
