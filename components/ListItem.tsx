import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import {
  GestureHandlerGestureEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import { TaskInterface } from "../screens/SwipeToDelete";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
interface ListItemProps
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  task: TaskInterface;
  onDismiss?: (task: TaskInterface) => void;
}

const LIST_ITEM_HEIGHT = 70;
export type ContextInterface = {
  translateX: number;
};
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const ListItem: FC<ListItemProps> = ({
  task,
  onDismiss,
  simultaneousHandlers,
}) => {
  const translateX = useSharedValue<any>(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
      const shouldBeDismissed = event.translationX <= TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) runOnJS(onDismiss)(task);
        });
      } else {
        translateX.value = withSpring(0);
      }
    },
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  const rIconContainerStyle = useAnimatedStyle(() => {
    return {
      opacity:
        translateX.value <= TRANSLATE_X_THRESHOLD
          ? withTiming(1)
          : withTiming(0),
    };
  });
  const rTaskCOntainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });
  return (
    <Animated.View style={[styles.taskContainer, rTaskCOntainerStyle]}>
      <PanGestureHandler
        onGestureEvent={panGesture}
        simultaneousHandlers={simultaneousHandlers}
      >
        <Animated.View style={[styles.task, rStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome5
          name="trash-alt"
          size={LIST_ITEM_HEIGHT * 0.4}
          color={"red"}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  taskContainer: {
    alignItems: "center",
  },
  task: {
    zIndex: 999,
    marginTop: 10,
    width: "90%",
    height: LIST_ITEM_HEIGHT,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    marginTop: 10,
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: "absolute",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});
