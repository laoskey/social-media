import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import CustomButton from "@/components/Button";
import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/helpers/common";
import { useAuth } from "@/lib/contexts/AuthContext";
import Avatar from "@/components/Avatar";
import RichTextEditor from "@/components/RichTextEditor";

interface NewPostProps {}
function NewPost() {
  const { user } = useAuth();
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Header title="new post" />
        <ScrollView contentContainerStyle={{ gap: 20 }}>
          {/* Avatar */}
          <View style={styles.header}>
            <Avatar
              uri={user?.image}
              size={hp(6.5)}
              rounded={theme.radius.xl}
            />
            <View style={{ gap: 2 }}>
              <Text style={styles.username}>{user && user.name}</Text>
              <Text style={styles.publicText}>Public</Text>
            </View>
          </View>
          {/* RichTextEditor */}
          <View style={styles.textEditor}>
            <RichTextEditor />
          </View>
          {/* Add media */}
          <View></View>
          {/* Post button */}
          <View></View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

export default NewPost;

const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    // shadowColor: theme.colors.textLight,
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.6,
    // shadowRadius: 8,
  },
  video: {},
  file: {
    height: hp(30),
    width: "100%",
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    borderCurve: "continuous",
  },
  imageIcon: {
    borderRadius: theme.radius.xl,
    // backgroundColor: theme.colors.gray,
    // padding: 6,
  },
  addImageText: {
    fontSize: hp(1.9),
    fontWeight: theme.fonts.semibold as "600",
    color: theme.colors.text,
  },
  mediaIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  media: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderColor: theme.colors.gray,
  },
  textEditor: {
    // marginTop: 10,
  },
  publicText: {
    fontSize: hp(1.7),
    fontWeight: theme.fonts.medium as "500",
    color: theme.colors.textLight,
  },
  avatar: {
    height: hp(6.5),
    width: hp(6.5),
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: theme.fonts.semibold as "600",
    color: theme.colors.text,
    textTransform: "capitalize",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: theme.fonts.semibold as "600",
    color: theme.colors.text,
    textAlign: "center",
    // marginBottom: 10,
  },
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },
});
