import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import React from "react";
import FlatListItems from "../components/FlatListItems";
import { useSharedValue } from "react-native-reanimated";
const data = new Array(50).fill(0).map((_, index) => ({ id: index }));
const FlatListScrollAnimation = () => {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingTop: 40 }}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FlatListItems item={item} viewableItems={viewableItems} />
        )}
        onViewableItemsChanged={({ viewableItems: items }) => {
          viewableItems.value = items;
        }}
      />
    </View>
  );
};

export default FlatListScrollAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
