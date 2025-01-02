import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { hp } from "@/lib/helpers/common";
import { theme } from "@/constants/theme";
import { Image } from "expo-image";

interface AvatarProps {
  uri?: string;
  size?: number;
  rounded?: number;
  style?: object;
}
function Avatar({ uri, size = hp(4.5), rounded = theme.radius.md, style = {} }: AvatarProps) {
  return (
    <Image
      source={uri}
      transition={100}
      style={[styles.avatar, { height: size, width: size, borderRadius: rounded }, style]}
    />
  );
}

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderCurve: "continuous",
    borderColor: theme.colors.darkLight,
    borderWidth: 1,
  },
});
