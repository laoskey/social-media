import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import * as FileSystem from "expo-file-system";
import { Octicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Sharing from "expo-sharing";
import Toast, { ToastConfig, ToastConfigParams, ToastProps } from "react-native-toast-message";

import { hp, wp } from "@/lib/helpers/common";
import CustomButton from "@/components/Button";
import { PixelImage } from "@/components/pixels/ImageGrid";
import { theme } from "@/constants/theme";

interface ImageScreenProps {}

function ImageScreen() {
  const [status, setStatus] = useState("loading");
  const item = useLocalSearchParams<PixelImage>();
  let uri = item.webformatURL;
  const fileName = item?.previewURL.split("/").pop();
  const imageUrl = uri;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;
  const onLoad = () => {
    setStatus("");
  };
  const gsetSize = () => {
    const aspecRatio = item?.imageWidth / item?.imageHeight;
    const maxWidth = Platform.OS === "web" ? wp(50) : wp(92);

    let calculatedHeight = maxWidth / aspecRatio;
    let caculatedWidth = maxWidth;
    if (aspecRatio < 1) {
      // portrait image
      caculatedWidth = calculatedHeight * aspecRatio;
    }
    return {
      height: calculatedHeight,
      width: caculatedWidth,
    };
  };

  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);
      setStatus("");
      //   console.log(uri);
      return uri;
    } catch (error) {
      if (error instanceof Error) {
        console.log("Pixcel_got error", error.message);
        Alert.alert("Image", error.message);
      } else {
        console.log("Pixcel_unknown error", error);
        Alert.alert("Image", "An unknown error occurred");
      }
    }
  };
  const handleDownloadImage = async () => {
    if (Platform.OS == "web") {
      const anchor = document.createElement("a");
      anchor.href = imageUrl;
      anchor.target = "_blank";
      anchor.download = fileName || "download";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      setStatus("downloading");
      let uri = await downloadFile();

      if (uri) {
        showToast(`Image has been download ${uri}`);
      }
      //   setStatus("");
    }
  };
  const handleShareImage = async () => {
    if (Platform.OS == "web") {
      await navigator.clipboard.writeText(imageUrl);
      showToast("Link copied");
    } else {
      setStatus("sharing");
      let uri = await downloadFile();
      if (uri) {
        // share image
        await Sharing.shareAsync(uri);
      }
    }
  };

  const showToast = (message: any) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
  };

  const toastConfig = {
    success: ({ text1, props, ...rest }: ToastConfigParams<any>) => {
      return (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{text1}</Text>
        </View>
      );
    },
  };

  return (
    <BlurView
      tint="dark"
      intensity={60}
      //   experimentalBlurMethod="dimezisBlurView"
      blurReductionFactor={10}
      style={styles.container}
    >
      <View style={[gsetSize()]}>
        <View style={styles.loading}>
          {status === "loading" && (
            <ActivityIndicator
              size={"large"}
              color={"white"}
            />
          )}
        </View>
        <Image
          source={uri}
          transition={100}
          onLoad={onLoad}
          style={[styles.image, gsetSize()]}
        />
      </View>

      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable
            style={styles.button}
            onPress={() => router.back()}
          >
            <Octicons
              name="x"
              size={24}
              color={"white"}
            />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          {status === "downloading" ? (
            <View style={styles.button}>
              <ActivityIndicator
                size={"small"}
                color={"white"}
              />
            </View>
          ) : (
            <Pressable
              style={styles.button}
              onPress={handleDownloadImage}
            >
              <Octicons
                name="download"
                size={24}
                color={"white"}
              />
            </Pressable>
          )}
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status === "sharing" ? (
            <View style={styles.button}>
              <ActivityIndicator
                size={"small"}
                color={"white"}
              />
            </View>
          ) : (
            <Pressable
              style={styles.button}
              onPress={handleShareImage}
            >
              <Octicons
                name="share"
                size={22}
                color={"white"}
              />
            </Pressable>
          )}
        </Animated.View>
      </View>
      <Toast
        config={toastConfig}
        visibilityTime={2500}
      />
    </BlurView>
  );
}

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  button: {
    height: hp(6),
    width: hp(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
  },
  toast: {
    padding: 15,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.xl,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  toastText: {
    fontSize: hp(1.8),
    fontWeight: 600,
    color: "white",
  },
});
