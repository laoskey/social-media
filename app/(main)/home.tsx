import { View, Text, StyleSheet, ScrollView, Alert, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import CustomButton from "@/components/Button";
import { useAuth } from "@/lib/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { hp, wp } from "@/lib/helpers/common";
import { theme } from "@/constants/theme";
import Icon from "@/assets/hugeicons";
import { useRouter } from "expo-router";
import Avatar from "@/components/Avatar";
import { fetchPosts } from "@/lib/services/postService";
import PostCard from "@/components/PostCard";

var limit = 0;
interface HomeProps {}
function Home() {
  const { user, setAuth } = useAuth();
  const [posts, setPosts] = useState<any[] | undefined>([]);
  const router = useRouter();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    limit += 10;
    const res = await fetchPosts(limit);
    if (res.success) {
      setPosts(res.data);
    }
  };

  return (
    <ScreenWrapper bg="white">
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
        {/* posts */}
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(item) => (
            <PostCard
              item={item}
              currentUser={user}
              router={() => router}
            />
          )}
        />
      </View>
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
