import { Stack } from "expo-router";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Warning: TRenderEngineProvider",
  "Warning: MemoizedTNodeRenderer",
  "Warning: TNodeChildrenRenderer",
  "Warning: bound renderChildren",
]);
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
