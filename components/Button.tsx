import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
} from "react-native";
import Reacct from "react";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import Loading from "./Loading";

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  buttonStyle?: string | any;
  textStyle?: string | any;
  loading?: boolean;
  hasShadow?: boolean;
}
function CustomButton({
  title = "",
  onPress,
  buttonStyle,
  textStyle,
  loading = false,
  hasShadow = true,
}: CustomButtonProps) {
  const shadowStyle = {
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 4,
  };

  if (loading) {
    return (
      <View
        style={[
          styles.button,
          buttonStyle,
          { backgroundColor: "white" },
        ]}
      >
        <Loading />
      </View>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, buttonStyle, hasShadow && shadowStyle]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: hp(6.6),
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: theme.radius.xl,
  },
  text: {
    fontSize: hp(2.5),
    color: "white",
    fontWeight: theme.fonts.bold as "700",
  },
});
