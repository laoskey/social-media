import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import BackButton from "@/components/BackButton";
import { useRouter } from "expo-router";
import { hp, wp } from "@/helpers/common";
import Input from "@/components/TextInput";

interface LoginProps {}
function Login() {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton />
        {/* Welecome */}
        <View>
          <Text style={styles.welecomeText}>Hey,</Text>
          <Text style={styles.welecomeText}>Welecome back</Text>
        </View>
        {/* Form */}
        <View style={styles.form}>
          <Text
            style={{ fontSize: hp(1.5), color: theme.colors.text }}
          >
            Please login to continue
          </Text>
          <Input />
        </View>
        {/* Fotter */}
      </View>
    </ScreenWrapper>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welecomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold as "700",
    color: theme.colors.text,
  },
  form: { gap: 25 },
  forgotPassword: {
    textAlign: "center",
    fontWeight: theme.fonts.semibold as "600",
    color: theme.colors.text,
  },
  fotter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  fotterText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
