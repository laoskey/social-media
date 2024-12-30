import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { hp, wp } from "@/helpers/common";
import image from "@/constants/image";
import { theme } from "@/constants/theme";
import CustomButton from "@/components/Button";

interface WelecomeProps {}
function Welecome() {
  const [loading, setLoaing] = useState(false);
  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/*Welecome Image */}
        <Image
          style={styles.welecomeImage}
          source={image.welecome}
          resizeMode="contain"
        />
        {/* App name and punchline */}
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>LinkUp!</Text>
          <Text style={styles.punchline}>
            From breaking news and entertainment to sports and
            politics, get the full story with all the live commentary.
          </Text>
        </View>
        {/* Get starte button */}
        <View style={styles.fotter}>
          <CustomButton
            title="Getting  started"
            buttonStyle={{
              marginHorizontal: wp(3),
            }}
            onPress={() => router.back()}
            loading={loading}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>
              Already have an account !
            </Text>
            <Pressable
              onPress={() => {
                Alert.alert("TODO:Login .?");
                router.push("/login");
              }}
            >
              <Text
                style={[
                  styles.loginText,
                  { color: theme.colors.primaryDark },
                  { fontWeight: theme.fonts.semibold as "600" },
                ]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default Welecome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginHorizontal: wp(4),
  },
  welecomeImage: {
    marginTop: hp(10),
    height: hp(30),
    width: wp(100),
    alignSelf: "center",
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: theme.fonts.extraBold as "800",
  },
  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.text,
    // marginBottom: hp(10),
  },
  fotter: {
    gap: 30,
    width: "100%",
    marginBottom: hp(6),
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  loginText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
