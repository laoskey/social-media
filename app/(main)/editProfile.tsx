import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";

interface EditProfileProps {}
function EditProfile() {
  return (
    <ScreenWrapper bg="white">
      <ScrollView>
        <View>
          <Text>Edit</Text>
        </View>
        <Header />
      </ScrollView>
    </ScreenWrapper>
  );
}

export default EditProfile;

const styles = StyleSheet.create({});
