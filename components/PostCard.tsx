import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { User } from "@/lib/contexts/AuthContext";

interface PostCardProps {
  item: {};
  currentUser: User;
  router: () => void;
}
function PostCard({ item, currentUser, router }: PostCardProps) {
  return (
    <View>
      <Text>PostCard</Text>
    </View>
  );
}

export default PostCard;

const styles = StyleSheet.create({});
