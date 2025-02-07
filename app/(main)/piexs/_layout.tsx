import { Stack } from "expo-router";
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function PiexLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen
            options={{ headerShown: false }}
            name="index"
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="home"
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
