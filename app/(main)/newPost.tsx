import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/helpers/common";
import { useAuth } from "@/lib/contexts/AuthContext";
import Avatar from "@/components/Avatar";
import RichTextEditor from "@/components/RichTextEditor";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "@/assets/hugeicons";
import * as ImagePicker from "expo-image-picker";
import { getSupabaseFileUrl } from "@/lib/services/imageService";
import { Image } from "expo-image";
import { ResizeMode, Video } from "expo-av";
import { createOrUpdatePost } from "@/lib/services/postService";
import { RichEditor } from "react-native-pell-rich-editor";

interface NewPostProps {}
interface Data {
  file: ImagePicker.ImagePickerAsset | null;
  body: string;
  userId: string | undefined;
  id?: string;
}
interface PostParams extends Record<string, any> {
  id: string;
  body: string;
  file: ImagePicker.ImagePickerAsset | null;
}
function NewPost() {
  const post = useLocalSearchParams<PostParams>();
  console.log("Edit", post);
  const { user } = useAuth();
  const bodyRef = useRef("");
  const editorRef = useRef<RichEditor>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);

  useEffect(() => {
    if (post && post.id) {
      console.log(1);
      bodyRef.current = post.body;
      setFile(post.file || null);
      setTimeout(() => editorRef.current?.setContentHTML(post.body), 300);
    }
  }, []);
  const onPick = async (isImage: boolean) => {
    let mediaConfig = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3] as [number, number],
      quality: 0.75,
    };

    if (!isImage) {
      mediaConfig = {
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3] as [number, number],
        quality: 0.75,
      };
    }
    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFile(result.assets[0]);
    }
  };

  const isLocalFile = (file: any) => {
    if (!file) {
      return null;
    }
    if (typeof file === "object") {
      return true;
    }
    return false;
  };
  const getFileType = (file: any) => {
    if (!file) {
      return null;
    }
    if (isLocalFile(file)) {
      return file.type;
    }

    // Check image or video for remote file
    if (file.includes("postImages")) {
      return "image";
    }
    return "video";
  };

  const getFileUri = (file: any) => {
    if (!file) {
      return null;
    }
    if (isLocalFile(file)) {
      return file.uri;
    }
    return getSupabaseFileUrl(file)?.uri;
  };

  const onSubmit = async () => {
    if (!bodyRef.current && !file) {
      Alert.alert("Post", "Please choose an image or add post body");
    }

    let data: Data = {
      file,
      body: bodyRef.current,
      userId: user?.id,
    };
    if (post && post.id) {
      data.id = post.id;
    }
    // create post
    setLoading(true);
    let res = await createOrUpdatePost(data);
    console.log("RES", res);
    console.log("DATA:", data);
    setLoading(false);

    if (res.success) {
      setFile(null);
      bodyRef.current = "";
      editorRef.current?.setContentHTML("");
      router.back();
    } else {
      if ("msg" in res) {
        Alert.alert("Post", res.msg);
      } else {
        Alert.alert("Post", "Something went wrong in create post ");
      }
    }
  };
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
            <RichTextEditor
              editorRef={editorRef}
              onChange={(body: any) => (bodyRef.current = body)}
            />
          </View>
          {file && (
            <View style={styles.file}>
              {getFileType(file) === "video" ? (
                <Video
                  source={{ uri: getFileUri(file) }}
                  style={{ flex: 1 }}
                  useNativeControls
                  isLooping
                  resizeMode={ResizeMode.COVER}
                />
              ) : (
                <Image
                  source={{ uri: getFileUri(file) }}
                  resizeMode="cover"
                  style={{ flex: 1 }}
                />
              )}
              <Pressable
                style={styles.closeIcon}
                onPress={() => setFile(null)}
              >
                <Icon
                  name="delete"
                  size={22}
                  color="white"
                />
              </Pressable>
            </View>
          )}
          {/* media */}
          <View style={styles.media}>
            <Text style={styles.addImageText}>Add to your post</Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity onPress={() => onPick(true)}>
                <Icon
                  name="image"
                  size={30}
                  color={theme.colors.dark}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPick(false)}>
                <Icon
                  name="video"
                  size={33}
                  color={theme.colors.dark}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <CustomButton
          title={post && post.id ? "Update" : "Post"}
          buttonStyle={{ height: hp(6.2) }}
          loading={loading}
          hasShadow={false}
          onPress={onSubmit}
        />
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
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 5,
    borderRadius: 50,
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
