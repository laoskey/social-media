import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { PixelImage } from "./ImageGrid";
import { Image } from "expo-image";
import { getImageSize, wp } from "@/lib/helpers/common";
import { theme } from "@/constants/theme";

interface ImageCardProps {
  item: PixelImage;
  index: number;
  columes: number;
}
function ImageCard({ item, index, columes }: ImageCardProps) {
  const isLastRow = () => {
    return (index + 1) % columes === 0;
  };
  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(height, width) };
  };
  return (
    <Pressable style={[styles.imageWrapper, !isLastRow() && styles.spaceing]}>
      <Image
        source={item.webformatURL}
        style={[styles.image, getImageHeight()]}
        contentFit="cover"
        transition={100}
      />
    </Pressable>
  );
}

export default ImageCard;

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBg,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  spaceing: {
    marginRight: wp(2),
  },
});
