import { Button, StyleSheet, View } from "react-native";
import React from "react";
const screens = ["Intro", "DraggableView", "ScrollViewAnimation"];
const Home = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      {screens.map((screen, index) => (
        <View key={index}>
          <Button title={screen} onPress={() => navigation.navigate(screen)} />
        </View>
      ))}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
