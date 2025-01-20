import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { createComment, fetchPostDetails, removeComment, removePost } from "@/lib/services/postService";
import Loading from "@/components/Loading";
import PostCard from "@/components/PostCard";
import { ScrollView } from "react-native";
import { useAuth } from "@/lib/contexts/AuthContext";
import PostCardForDetails from "@/components/PostCardForDetails";
import { hp, wp } from "@/lib/helpers/common";
import { theme } from "@/constants/theme";
import Input from "@/components/TextInput";
import Icon from "@/assets/hugeicons";
import CommentItem from "@/components/CommentItem";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { getUserData } from "@/lib/services/useService";

interface Post {
  id?: string;
  comments?: [];
  userId?: string;
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
    //TODO: Refresh posts
    // TOTO:Add postlike channel to refresh post_likes
    let commentChannel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments", filter: `postId=eq.${postId}` },
        handleCommentEvent
      )
      .subscribe();
    // getPosts();
    getPostDetails();

    return () => {
      supabase.removeChannel(commentChannel);
    };
  }, []);

  const handleCommentEvent = async (payload: any) => {
    console.log("Gow new comment", payload.new);
    if (payload.new) {
      let newComment = { ...payload.new };
      let res = await getUserData(newComment.userId);
      newComment.users = res.success ? res.data : {};
      // console.log(newComment.users);

      setPost((prePost: any) => {
        return {
          ...prePost,
          comments: [newComment, ...prePost.comments],
        };
      });
    }
  };
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
      // console.log("res:", res.data);
      inputRef?.current?.clear();
      commentRef.current = "";
    } else {
      Alert.alert("Comment", res.msg);
    }
  };

  const onDeleteComment = async (comment: any) => {
    console.log("Deleting comment:", comment);
    let res = await removeComment(comment.id);

    if (res.success) {
      let updatePost = { ...post };
      updatePost.comments = updatePost.comments?.filter((c: { id: string }) => c.id !== comment.id) as
        | [];
      setPost(updatePost);
    } else {
      Alert.alert("Comment", res.msg);
    }
  };
  const onDeletePost = async (item: any) => {
    // delete the post
    const res = await removePost(post?.id as string);
    if (res.success) {
      console.log(res.data);
      router.back();
    } else {
      Alert.alert("Post", res.msg);
    }
  };
  const onEditPost = async (item: any) => {
    router.back();

    router.push({ pathname: "/(main)/newPost", params: { ...item } });
  };
  if (startLoading) {
    return (
      <View style={styles.center}>
        <Loading />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={[styles.center, { justifyContent: "flex-start", marginTop: 100 }]}>
        <Text style={styles.notFound}>Post not found !</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* TODO:Fixed the style of header */}
      {Platform.OS === "android" && (
        <View style={{ paddingHorizontal: wp(4), marginTop: -30, marginBottom: 15 }}>
          <Header title="Post" />
        </View>
      )}
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
          showDelete={true}
          onDelete={onDeletePost}
          onEdit={onEditPost}
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
        <View style={{ marginVertical: 15, gap: 17 }}>
          {post?.comments?.map((comment: { created_at?: string; userId?: string }) => (
            <CommentItem
              onDelete={onDeleteComment}
              item={comment}
              key={comment?.created_at?.toString()}
              canDelete={user?.id === comment.userId || user?.id === post.userId}
            />
          ))}
          {post.comments?.length === 0 && (
            <Text style={{ color: theme.colors.text, marginLeft: 5 }}>Be first to comment !</Text>
          )}
        </View>
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
