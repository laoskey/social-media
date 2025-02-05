import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./ImageCard";
import { getColumeCount, wp } from "@/lib/helpers/common";

export interface Image {
  collections: number;
  comments: number;
  downloads: number;
  id: number;
  imageHeight: number;
  imageSize: number;
  imageWidth: number;
  largeImageURL: string;
  likes: number;
  pageURL: string;
  previewHeight: number;
  previewURL: string;
  previewWidth: number;
  tags: string;
  type: string;
  user: string;
  userImageURL: string;
  user_id: number;
  views: number;
  webformatHeight: number;
  webformatURL: string;
  webformatWidth: number;
}
interface ImageGridProps {
  images: Image[];
}
function ImageGrid({ images }: ImageGridProps) {
  const columes = getColumeCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columes}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item, index }) => (
          <ImageCard
            item={item}
            index={index}
            columes={columes}
          />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
}

export default ImageGrid;

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
    // backgroundColor: "red",
  },
  listContainerStyle: {
    paddingHorizontal: wp(4),
  },
});
