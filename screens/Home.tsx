import { Button, StyleSheet, View, FlatList } from "react-native";

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

  "Counter",
  "Clock",
  "FlatListScrollAnimation",
  "Tarots",
  "Switch",
  "CircularCarousel",
  "Spotify",
];
const Home = ({ navigation }: { navigation: any }) => {
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
  },
});
