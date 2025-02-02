import { Stack } from "expo-router";

export default function PiexLayout() {
  return (
    <Stack>
      <Stack.Screen
        options={{ headerShown: false }}
        name="index"
      />
    </Stack>
  );
}
