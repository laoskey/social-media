import { View, StyleSheet, Text, ScrollView, Pressable, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { theme } from "@/constants/theme";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import BackButton from "@/components/BackButton";
import { useRouter } from "expo-router";
import { hp, wp } from "@/lib/helpers/common";
import Input from "@/components/TextInput";
import Icon from "@/assets/hugeicons";
import CustomButton from "@/components/Button";
import { supabase } from "@/lib/supabase";

interface SignUpProps {}
function SignUp() {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  // const confirmRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("SignUp", "please fill all the fields ");
      return;
    }
    //  TODO : add the confirm password func

    // AUthentication
    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    // TODO:2FA

    setLoading(false);

    if (error) {
      Alert.alert("SIgn Up", error.message);
    }
  };
  return (
    <ScreenWrapper bg="white">
      <ScrollView>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <BackButton />
          {/* Welecome */}
          <View>
            <Text style={styles.welecomeText}>Hey,</Text>
            <Text style={styles.welecomeText}>Let's get started</Text>
          </View>
          {/* Form */}
          <View style={styles.form}>
            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
              Please fill the details to create an account
            </Text>
            <Input
              icon={<Icon name="user" />}
              placeholder="Enter your username"
              onChangeText={(value: any) => (nameRef.current = value)}
            />
            <Input
              icon={<Icon name="mail" />}
              placeholder="Enter your email"
              onChangeText={(value: any) => (emailRef.current = value)}
            />
            <Input
              icon={<Icon name="lock" />}
              placeholder="Enter your password"
              secureTextEntry
              onChangeText={(value: any) => (passwordRef.current = value)}
            />
            {/* <Input
              icon={<Icon name="lock" />}
              placeholder="Confirm your password"
              secureTextEntry
              onChangeText={(value: any) =>
                (confirmRef.current = value)
              }
            /> */}

            {/* Button */}
            <CustomButton
              title={"Sign Up"}
              loading={loading}
              onPress={onSubmit}
            />
          </View>
          {/* Fotter */}
          <View style={styles.fotter}>
            <Text style={styles.fotterText}>Already have an account</Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text
                style={[
                  styles.fotterText,
                  {
                    color: theme.colors.primaryDark,
                    fontWeight: theme.fonts.semibold as "600",
                  },
                ]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

export default SignUp;

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
    textAlign: "right",
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
