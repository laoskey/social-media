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
import Loading from "@/components/Loading";
import { getUserData } from "@/lib/services/useService";

var limit = 0;
interface HomeProps {}
function Home() {
  const { user, setAuth } = useAuth();
  const [posts, setPosts] = useState<any[] | undefined>([]);
  const router = useRouter();
  const [hasMore, setHasmMore] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);

  const handlePostEvent = async (payload: any) => {
    console.log("Got ost  ", payload);

    if (payload.eventType === "INSERT" && payload.new.id) {
      let newPost = { ...payload.new };
      let res = await getUserData(newPost.userId);

      newPost.post_likes = []; //Fixed:fixed  the property name error  caused the insert bug
      newPost.comments = [{ count: 0 }];
      newPost.user = res.success ? res.data : {};
      setPosts((prePosts: any) => [newPost, ...prePosts]);
    }
    if (payload.eventType === "DELETE" && payload.old.id) {
      // refetch the posts data
      setPosts((prePosts) => {
        let updatePosts = prePosts?.filter((post: { id: string }) => post.id !== payload.old.id);
        return updatePosts;
      });
    }
    if (payload.eventType === "UPDATE" && payload.new.id) {
      setPosts((prePosts) => {
        let updatePost = prePosts?.map((post) => {
          if (post.id === payload.new.id) {
            post.body = payload.new.body;
            post.file = payload.new.file;
          }
          return post;
        });
        return updatePost;
      });
    }
  };
  // TODO:requeirements:
  // 1.notification count  can be fetch in real time
  // 2.when user touch the notification component,the notification count can be 0
  // 3.when user go in to the notification screen, and touch the notification item,
  // 3.1>user can route to the relation post
  // 3.2>and remove this notification in notifications screen
  const handleNewNotification = async (payload: any) => {
    console.log("Got ost  ", payload);
    if (payload.eventType === "INSERT" && payload.new.id) {
      setNotificationCount((pre) => pre + 1);
    }
  };

  const handlePostLikes = async (payload: any) => {
    console.log("Got ost  ", payload);
    // TODO： add the logic to update the like on posts
  };

  useEffect(() => {
    //TODO: Refresh posts
    // TOTO:Add postlike channel to refresh post_likes
    let postChannel = supabase
      .channel("posts")
      .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, handlePostEvent)
      .subscribe();
    let notificationChannel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `receiverId=eq.${user?.id}`,
        },
        handleNewNotification
      )
      .subscribe();
    let postLikeChannel = supabase
      .channel("post_likes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "post_likes",
        },
        handlePostLikes
      )
      .subscribe();
    getPosts();

    // TODO:post like fetch in real time: ?check the userID?
    // 1> add the insert and delete event channnel on post_likes table
    // 2> when user insert the like ,update the post_like property on posts
    // 3> when user delete the like , return the posts without this deleted lilke

    return () => {
      supabase.removeChannel(postChannel);
      supabase.removeChannel(notificationChannel);
      supabase.removeChannel(postLikeChannel);
    };
  }, []);

  const getPosts = async () => {
    if (!hasMore) {
      return null;
    }

    limit += 10;
    const res = await fetchPosts(limit);

    if (res.success) {
      if (posts?.length === res.data?.length) {
        setHasmMore(false);
      }

      setPosts(res.data);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Toasts</Text>
          <View style={styles.icons}>
            <Pressable
              onPress={() => {
                setNotificationCount(0);
                router.push("/(main)/notifications");
              }}
            >
              <Icon
                name="heart"
                size={hp(3.2)}
                strokeWidth={2}
                color={theme.colors.text}
              />
              {notificationCount > 0 && (
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{notificationCount}</Text>
                </View>
              )}
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

        {posts && posts.length > 0 ? (
          <FlatList
            // TODO:FIX:when first posts loading, the FLatlist will re-call the getPosts(),until the Posts data revive,
            // it's destory the getPost'limit ,should add some logic to control rendering the FlatList
            data={posts}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listStyle}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={10}
            onEndReached={() => {
              console.log("Got to the end");
              getPosts();
            }}
            onEndReachedThreshold={0}
            renderItem={(item) => (
              <PostCard
                item={item}
                currentUser={user}
                // router={() => router}
              />
            )}
            ListFooterComponent={
              hasMore ? (
                <View style={{ marginBottom: posts?.length === 0 ? 200 : 30 }}>
                  <Loading />
                </View>
              ) : (
                <View style={{ marginVertical: 30 }}>
                  <Text style={styles.noPosts}>No more posts</Text>
                </View>
              )
            }
          />
        ) : (
          <View style={{ marginTop: 200 }}>
            <Loading />
          </View>
        )}
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
