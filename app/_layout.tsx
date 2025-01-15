import { Stack } from "expo-router";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Warning: TRenderEngineProvider",
  "Warning: MemoizedTNodeRenderer",
  "Warning: TNodeChildrenRenderer",
]);
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
