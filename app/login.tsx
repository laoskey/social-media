import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import Home from "@/assets/hugeicons/Home";
import Icon from "@/assets/hugeicons";

interface LoginProps {}
function Login() {
  return (
    <View>
      <Text>Login</Text>
      <Icon
        name="home"
        color={theme.colors.primaryDark}
      />
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({});
