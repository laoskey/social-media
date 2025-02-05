import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "./ImageGrid";

interface ImageCardProps {
  item: Image;
  index: number;
  columes: number;
}
function ImageCard({ item, index, columes }: ImageCardProps) {
  return (
    <View>
      <Text>{index}ImageCard</Text>
    </View>
  );
}

export default ImageCard;

const styles = StyleSheet.create({});
