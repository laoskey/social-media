import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Reacct from "react";
import { theme } from "@/constants/theme";

interface LoadingProps {
  size?: "large" | "small";
  color?: string;
}
function Loading({
  size = "large",
  color = theme.colors.primary,
}: LoadingProps) {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        size={size}
        color={color}
      />{" "}
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({});
