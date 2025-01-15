import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchPostDetails } from "@/lib/services/postService";
import Loading from "@/components/Loading";
import PostCard from "@/components/PostCard";
import { ScrollView } from "react-native";
import { useAuth } from "@/lib/contexts/AuthContext";
import PostCardForDetails from "@/components/PostCardForDetails";
import { hp, wp } from "@/lib/helpers/common";
import { theme } from "@/constants/theme";

interface PostDetailsProps {}
function PostDetails() {
  const { postId } = useLocalSearchParams();
  const [post, setPost] = useState(null);
  const [startLoading, setStartLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getPostDetails();
  }, []);
  const getPostDetails = async () => {
    // fetch post details
    let res = await fetchPostDetails(postId as string);
    if (res.success) {
      setPost(res.data);
    }
    setStartLoading(false);
  };
  if (startLoading) {
    return (
      <View style={styles.center}>
        <Loading />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        <PostCardForDetails
          item={post}
          currentUser={user}
          hasShadow={false}
        />
      </ScrollView>
    </View>
  );
}

export default PostDetails;

const styles = StyleSheet.create({
  loading: {
    height: hp(5.8),
    width: hp(5.8),
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 1.3 }],
  },
  notFound: {
    fontSize: hp(2.5),
    color: theme.colors.text,
    fontWeight: theme.fonts.medium as "500",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  secondIccon: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.8,
    borderRadius: theme.radius.lg,
    borderColor: theme.colors.primary,
    borderCurve: "continuous",
    height: hp(5.8),
    width: hp(5.8),
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: hp(7),
    // paddingVertical: hp(7),
  },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  list: {
    paddingHorizontal: wp(10),
  },
});
