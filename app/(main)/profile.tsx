import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BackButton from "@/components/BackButton";

interface ProfileProps {}
function Profile() {
  return (
    <View>
      <Text>Profile</Text>
      <BackButton />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({});
