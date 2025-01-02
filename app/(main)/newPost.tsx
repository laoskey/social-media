import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "@/components/Button";
import BackButton from "@/components/BackButton";

interface NewPostProps {}
function NewPost() {
  return (
    <View>
      <Text>NewPost</Text>
      <BackButton />
    </View>
  );
}

export default NewPost;

const styles = StyleSheet.create({});
