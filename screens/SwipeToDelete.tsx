import { StyleSheet, Text } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "../components/ListItem";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
const TITLES = [
  "Record the dismissible tutorial 🎥",
  "Leave 👍🏼 to the video",
  "Check YouTube comments",
  "Subscribe to the channel 🚀",
  "Leave a ⭐️ on the GitHub Repo",
];
export interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));
const BACKGROUND_COLOR = "#FAFBFF";
const SwipeToDelete = () => {
  const [tasks, setTasks] = useState(TASKS);
  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks((prev) => prev.filter((t) => t.index !== task.index));
  }, []);
  const scrollRef = useRef(null);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Tasks</Text>
      <ScrollView ref={scrollRef} style={{ flex: 1 }}>
        {tasks.map((task) => (
          <ListItem
            task={task}
            key={task.index}
            onDismiss={onDismiss}
            simultaneousHandlers={scrollRef}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SwipeToDelete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: "5%",
  },
});
