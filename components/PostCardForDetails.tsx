import { View, Text, StyleSheet, TouchableOpacity, Alert, Share } from "react-native";
import React, { useEffect, useState } from "react";
import { User } from "@/lib/contexts/AuthContext";
import { theme } from "@/constants/theme";
import { hp, stripHTMLTags, wp } from "@/lib/helpers/common";
import Avatar from "./Avatar";
import moment from "moment";
import Icon from "@/assets/hugeicons";
import RenderHtml from "react-native-render-html";
import { Image } from "expo-image";
import { downloadFile, getSupabaseFileUrl } from "@/lib/services/imageService";
import { AVPlaybackSource, ResizeMode, Video } from "expo-av";
import { createPostLike, removePostLike } from "@/lib/services/postService";
import Loading from "./Loading";
import { router } from "expo-router";

const textStyle = {
  color: theme.colors.dark,
  fontSize: hp(1.75),
};
const tagStyles = {
  div: textStyle,
  p: textStyle,
  ol: textStyle,
  h1: {
    color: theme.colors.dark,
  },
  h4: {
    color: theme.colors.dark,
  },
};

interface PostCardForDetailsProps {
  item: any;
  currentUser: User | null;
  // router: () => void;
  hasShadow?: boolean;
  showMoreIcon?: boolean;
  showDelete?: boolean;
  onDelete: (item: any) => void;
  onEdit: (item: any) => void;
}
interface Like {
  userId: string;
  postId: string;
}
function PostCardForDetails({
  item,
  currentUser,
  hasShadow = true,
  showMoreIcon = true,
  showDelete = false,
  onDelete,
  onEdit,
}: PostCardForDetailsProps) {
  const [likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState(false);
  const shandowStyle = {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  };
  const createdAt = moment(item.created_at).format("MMM D");
  const openPostDetails = () => {
    if (!showMoreIcon) {
      return null;
    }
    router.push({
      pathname: "/(main)/toasts/postDetails",
      params: {
        postId: item.id,
      },
    });
  };

  const onLike = async () => {
    // 1>check the  post is already like
    // 2>if true :  remove the post lik
    // 3>else: createPostLike

    if (liked) {
      let updateLikes = likes.filter((like) => like.userId !== currentUser?.id);
      setLikes([...updateLikes]);
      let res = await removePostLike(item.id, currentUser?.id);

      // console.log("remove res:", res);
      if (!res.success) {
        Alert.alert("Post", "Something went wrong");
      }
    } else {
      let data = {
        userId: currentUser?.id as string,
        postId: item.id as string,
      };
      setLikes([...likes, data]);
      let res = await createPostLike(data);

      if (!res.success) {
        Alert.alert("Post", "Something went wrong");
      }
    }
  };

  const onShare = async () => {
    // TODO:FIX: cant share the image
    let content: { message: any; url?: string } = { message: stripHTMLTags(item.body) };
    if (item.file && item.file !== undefined) {
      // download the file then share the local uri
      const filePath = getSupabaseFileUrl(item.file)?.uri;
      setLoading(true);
      let url = await downloadFile(filePath);
      setLoading(false);
      content.url = url as string;
    }
    Share.share(content);
  };
  const handleDelete = () => {
    Alert.alert("Cnnfirm", "Are you want to delete this post?", [
      { text: "cancle", onPress: () => console.log("modal cancelled"), style: "cancel" },
      { text: "Delete", onPress: () => onDelete(item), style: "destructive" },
    ]);
  };
  useEffect(() => {
    setLikes(item.post_likes);
  }, []);
  const liked = likes.filter((like) => like?.userId === currentUser?.id)[0] ? true : false;
  // console.log("POST_ITEM", item);
  return (
    <View style={[styles.container, hasShadow && shandowStyle]}>
      <View style={styles.header}>
        {/* user info and post time */}
        <View style={styles.userInfo}>
          <Avatar
            size={hp(4.5)}
            uri={item.user.image}
            rounded={theme.radius.md}
          />
          <View style={{ gap: 2 }}>
            <Text style={styles.username}>{item.user.name}</Text>
            <Text style={styles.postTime}>{createdAt}</Text>
          </View>
        </View>
        {showMoreIcon && (
          <TouchableOpacity onPress={openPostDetails}>
            <Icon
              name="threeDotsHorizontal"
              size={hp(3.4)}
              strokeWidth={3}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
        {showDelete && currentUser?.id === item.userId && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => onEdit(item)}>
              <Icon
                name="edit"
                size={hp(2.5)}
                strokeWidth={3}
                color={theme.colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Icon
                name="delete"
                size={hp(2.5)}
                strokeWidth={3}
                color={theme.colors.rose}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* post body and meddia */}
      <View style={styles.content}>
        <View style={styles.postBody}>
          {item.body && (
            <RenderHtml
              contentWidth={wp(100)}
              source={{ html: item.body }}
              tagsStyles={tagStyles}
            />
          )}
        </View>
        {/* post image */}
        {item?.file && item?.file.includes("postImages") && (
          <Image
            source={getSupabaseFileUrl(item.file)}
            transition={100}
            style={styles.postMedia}
            contentFit="cover"
          />
        )}
        {/* post media */}
        {item?.file && item?.file.includes("postVideos") && (
          <Video
            style={[styles.postMedia, { height: hp(30) }]}
            source={getSupabaseFileUrl(item?.file) as AVPlaybackSource}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
          />
        )}
      </View>
      {/* like ,comment & share */}
      <View style={styles.footer}>
        <View style={styles.fotterButton}>
          <TouchableOpacity onPress={onLike}>
            <Icon
              name="heart"
              size={24}
              color={liked ? theme.colors.rose : theme.colors.textLight}
              fill={liked ? theme.colors.rose : "transparent"}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{likes?.length}</Text>
        </View>
        <View style={styles.fotterButton}>
          <TouchableOpacity onPress={openPostDetails}>
            <Icon
              name="comment"
              size={24}
              color={theme.colors.textLight}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{item.comments[0].count}</Text>
        </View>
        <View style={styles.fotterButton}>
          {loading ? (
            <Loading size="small" />
          ) : (
            <TouchableOpacity onPress={onShare}>
              <Icon
                name="share"
                size={24}
                color={theme.colors.textLight}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

export default PostCardForDetails;

const styles = StyleSheet.create({
  count: { color: theme.colors.text, fontSize: hp(1.8) },
  actions: { flexDirection: "row", alignItems: "center", gap: 18 },
  fotterButton: { marginLeft: 5, flexDirection: "row", alignItems: "center", gap: 4 },
  footer: { flexDirection: "row", alignItems: "center", gap: 15 },
  postBody: { marginLeft: 5 },
  postMedia: { height: hp(40), width: "100%", borderRadius: theme.radius.xl, borderCurve: "continuous" },
  content: {
    gap: 10,
    // marginBottom:10
  },
  postTime: {
    fontSize: hp(1.4),
    color: theme.colors.textLight,
    fontWeight: theme.fonts.medium as "500",
  },
  username: {
    fontSize: hp(1.7),
    color: theme.colors.textDark,
    fontWeight: theme.fonts.medium as "500",
  },
  userInfo: { flexDirection: "row", alignItems: "center", gap: 8 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: theme.radius.xxl * 1.1,
    borderCurve: "continuous",
    padding: 10,
    paddingVertical: 12,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
    shadowColor: "#000",
  },
});
