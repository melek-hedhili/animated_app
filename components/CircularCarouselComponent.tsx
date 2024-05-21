import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Image, ImageProps } from "expo-image";
import CircularCarouselListItem from "./CircularCarouselListItem";
import { useSharedValue } from "react-native-reanimated";
const { width: windowWidth } = Dimensions.get("window");

export const ListItemWidth = windowWidth / 4;
type CircularCarouselComponentProps = {
  data: ImageProps["source"][];
};
const CircularCarouselComponent: FC<CircularCarouselComponentProps> = ({
  data,
}) => {
  const contextOffset = useSharedValue(0);
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={data}
      scrollEventThrottle={16}
      onScroll={(e) => (contextOffset.value = e.nativeEvent.contentOffset.x)}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 1.5 * ListItemWidth,
      }}
      style={styles.flatList}
      renderItem={({ item: imageSrc, index }) => (
        <CircularCarouselListItem
          contentOffset={contextOffset}
          imageSrc={imageSrc}
          index={index}
          key={index}
        />
      )}
    />
  );
};

export default CircularCarouselComponent;

const styles = StyleSheet.create({
  flatList: {
    position: "absolute",
    bottom: 0,
    height: 300,
  },
});
