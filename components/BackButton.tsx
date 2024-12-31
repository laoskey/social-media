import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import Icon from "@/assets/hugeicons";
import { theme } from "@/constants/theme";
import { router } from "expo-router";

interface BackButtonProps {
  size?: number;
  route?: () => void;
}
function BackButton({ size = 26, route }: BackButtonProps) {
  return (
    <Pressable
      onPress={route ? () => route() : () => router.back()}
      style={styles.button}
    >
      <Icon
        name="arrowLeft"
        size={size}
        strokeWidth={2.5}
        color={theme.colors.text}
      />
    </Pressable>
  );
}

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    justifyContent: "center",
    padding: 5,
    paddingRight: 8,
    borderRadius: theme.radius.sm,
    backgroundColor: "rgba(0,0,0,0.07)",
  },
});
