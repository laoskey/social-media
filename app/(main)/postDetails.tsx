import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { createComment, fetchPostDetails } from "@/lib/services/postService";
import Loading from "@/components/Loading";
import PostCard from "@/components/PostCard";
import { ScrollView } from "react-native";
import { useAuth } from "@/lib/contexts/AuthContext";
import PostCardForDetails from "@/components/PostCardForDetails";
import { hp, wp } from "@/lib/helpers/common";
import { theme } from "@/constants/theme";
import Input from "@/components/TextInput";
import Icon from "@/assets/hugeicons";

interface Post {
  id?: string;
  comments?: [];
}

interface PostDetailsProps {}
function PostDetails() {
  const { postId } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(true);
  const { user } = useAuth();
  const inputRef = useRef<TextInput>(null);
  const commentRef = useRef("");

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

  const onNewComment = async () => {
    if (!commentRef.current) {
      return null;
    }
    if (!post) {
      return null;
    }

    const data = {
      userId: user?.id,
      postId: post.id,
      text: commentRef.current,
    };
    // create comment
    setLoading(true);
    const res = await createComment(data);
    setLoading(false);

    if (res.success) {
      inputRef?.current?.clear();
      commentRef.current = "";
    } else {
      Alert.alert("Comment", res.msg);
    }
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
          // TODO:Synchronize the comments count between the home screen and postdetails screen
          item={{ ...post, comments: [{ count: post?.comments?.length }] }}
          currentUser={user}
          hasShadow={false}
          showMoreIcon={false}
        />
        {/* Comment input */}
        <View style={styles.inputContent}>
          <Input
            inputRef={inputRef}
            onChangeText={(value: any) => (commentRef.current = value)}
            placeholder={"Type comment"}
            placeholderTextColor={theme.colors.textLight}
            containerStyle={{ height: hp(6.2), borderRadius: theme.radius.xl, width: wp(66) }}
          />
          {loading ? (
            <View style={styles.loading}>
              <Loading size="small" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.secondIccon}
              onPress={onNewComment}
            >
              <Icon
                name="send"
                color={theme.colors.primaryDark}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* Recent comments list */}
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
    justifyContent: "space-between",
    gap: 10,
  },
  list: {
    paddingHorizontal: wp(10),
  },
});
