import { Button, StyleSheet, View, FlatList } from "react-native";
import React, { useEffect } from "react";
import * as Cellular from "expo-cellular";
export const screens = [
  "Intro",
  "DraggableView",
  "ScrollViewAnimation",
  "SwitchTheme",
  "Pinch",
  "DoubleTap",
  "ColorPicker",
  "ProgressCircle",
  "SwipeToDelete",
  "Menu",
  "Counter",
  "Clock",
  "FlatListScrollAnimation",
  "Tarots",
];
const Home = ({ navigation }: { navigation: any }) => {
  const [status, requestPermission] = Cellular.usePermissions();
  console.log(status);
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          padding: 10,
        }}
        numColumns={2}
        data={screens}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ margin: 5 }}>
            <Button title={item} onPress={() => navigation.navigate(item)} />
          </View>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
