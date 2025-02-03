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
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Pressable } from "react-native";
import { theme } from "@/constants/theme";

interface WelecomeScreenProps {}
function WelecomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("@/assets/images/welcome3.png")}
        resizeMode="cover"
        style={styles.bgImage}
      />
      {/* Liner gradent */}
      <Animated.View
        entering={FadeInDown.duration(600)}
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.5)", "white", "white"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        {/* Content */}
        <View style={styles.contentContainer}>
          <Animated.Text
            entering={FadeIn.delay(400).springify()}
            style={styles.title}
          >
            Pixels
          </Animated.Text>
          <Animated.Text
            entering={FadeIn.delay(500).springify()}
            style={styles.punchLIne}
          >
            Every pixel tells a story
          </Animated.Text>
          <Animated.View entering={FadeIn.delay(600).springify()}>
            <Pressable
              style={styles.startbutton}
              onPress={() => router.push("/(main)/piexs/home")}
            >
              <Text style={styles.startText}>Start Explore</Text>
            </Pressable>
          </Animated.View>
          <Animated.View entering={FadeIn.delay(700).springify()}>
            <Pressable
              onPress={() => {
                router.push("/(main)/toasts/home");
              }}
            >
              <Text style={styles.home}>Go Toasts</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },
  title: {
    fontSize: hp(7),
    color: theme.colors.netural(0.9),
    fontWeight: theme.fonts.bold as "700",
  },
  punchLIne: {
    fontSize: hp(2),
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: theme.fonts.medium as "500",
  },
  startbutton: {
    marginBottom: 45,
    backgroundColor: theme.colors.netural(0.9),
    padding: 15,
    paddingHorizontal: 90,

    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  startText: {
    color: theme.colors.white,
    fontSize: hp(3),
    fontWeight: theme.fonts.medium as "500",
    letterSpacing: 1,
  },
  home: {
    color: theme.colors.textLight,
    fontWeight: theme.fonts.semibold as "600",
    paddingBottom: 4,
  },
});
