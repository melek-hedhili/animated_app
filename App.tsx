import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigation from "./navigation/StackNavigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <StackNavigation />
    </SafeAreaProvider>
  );
}
