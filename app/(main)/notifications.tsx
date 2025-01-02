import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BackButton from "@/components/BackButton";

interface NotificationsProps {}
function Notifications() {
  return (
    <View>
      <Text>Notifications</Text>
      <BackButton />
    </View>
  );
}

export default Notifications;

const styles = StyleSheet.create({});
