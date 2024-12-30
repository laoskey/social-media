import { View, Text } from "react-native";
import Reacct from "react";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: React.ReactNode;
  bg?: string;
}
function ScreenWrapper({ children, bg }: ScreenWrapperProps) {
  const { top } = useSafeAreaInsets();

  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop,
        backgroundColor: bg,
      }}
    >
      {children}
    </SafeAreaView>
  );
}

export default ScreenWrapper;
