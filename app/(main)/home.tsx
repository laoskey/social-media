import { View, Text, StyleSheet, ScrollView, Alert, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import CustomButton from "@/components/Button";
import { useAuth } from "@/lib/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Loading from "@/components/Loading";
import { hp, wp } from "@/lib/helpers/common";
import { theme } from "@/constants/theme";
import Icon from "@/assets/hugeicons";
import { router } from "expo-router";
import Avatar from "@/components/Avatar";

interface HomeProps {}
function Home() {
  const { user, setAuth } = useAuth();

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Sign out", "Error signing out");
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>LinkUp</Text>
            <View style={styles.icons}>
              <Pressable onPress={() => router.push("/(main)/notifications")}>
                <Icon
                  name="heart"
                  size={hp(3.2)}
                  strokeWidth={2}
                  color={theme.colors.text}
                />
              </Pressable>
              <Pressable onPress={() => router.push("/(main)/newPost")}>
                <Icon
                  name="plus"
                  size={hp(3.2)}
                  strokeWidth={2}
                  color={theme.colors.text}
                />
              </Pressable>
              <Pressable onPress={() => router.push("/(main)/profile")}>
                {/* <Icon
                  name="user"
                  size={hp(3.2)}
                  strokeWidth={2}
                  color={theme.colors.text}
                /> */}
                <Avatar
                  uri={user?.image}
                  size={hp(4.3)}
                  rounded={theme.radius.sm}
                  style={{ borderWidth: 2 }}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <CustomButton
          title="Logout"
          onPress={onLogout}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold as "700",
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  listStyle: {
    paddingTop: hp(2),
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: theme.colors.text,
  },
  pill: {
    position: "absolute",
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: theme.colors.roseLight,
  },
  pillText: {
    color: "white",
    fontSize: hp(1.2),
    fontWeight: theme.fonts.bold as "700",
  },
});
