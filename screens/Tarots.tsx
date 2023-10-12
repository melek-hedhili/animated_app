import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../components/Card";
import { useSharedValue } from "react-native-reanimated";
const cards = [
  {
    source: require("../assets/cards/chariot.png"),
  },
  {
    source: require("../assets/cards/death.png"),
  },
  {
    source: require("../assets/cards/devil.png"),
  },
  {
    source: require("../assets/cards/fool.png"),
  },
  {
    source: require("../assets/cards/hermit.png"),
  },
];

const Tarots = () => {
  const shuffleBack = useSharedValue(false);
  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card key={index} card={card} index={index} shuffleBack={shuffleBack} />
      ))}
    </View>
  );
};

export default Tarots;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});
