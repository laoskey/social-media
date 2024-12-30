import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
} from "react-native";
import Reacct from "react";

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  buttonStyle?: string;
  textStyle?: string;
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
  return (
    <Pressable onPress={onPress}>
      <Text>Button</Text>
    </Pressable>
  );
}

export default CustomButton;

const styles = StyleSheet.create({});
