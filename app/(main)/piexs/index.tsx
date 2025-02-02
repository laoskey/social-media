import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import Header from "@/components/Header";
import { hp, wp } from "@/lib/helpers/common";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

interface WelecomeScreenProps {}
function WelecomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("@/assets/images/welcome2.jpg")}
        resizeMode="cover"
        style={styles.bgImage}
      />
      {/* Liner gradent */}
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.5)", "white", "white"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
      </View>
    </View>
  );
}

export default WelecomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  gradient: {
    width: wp(100),
    height: hp(65),
    bottom: 0,
    position: "absolute",
  },
});
