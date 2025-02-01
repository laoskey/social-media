import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import Header from "@/components/Header";
import { wp } from "@/lib/helpers/common";
import ScreenWrapper from "@/components/ScreenWrapper";

interface indexProps {}
function index() {
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Header title="Piex" />
        <Text>index</Text>
      </View>
    </ScreenWrapper>
  );
}

export default index;

const styles = StyleSheet.create({
  container: {
    // marginVertical: wp(4),
    paddingHorizontal: wp(4),
  },
});
