import { theme } from "@/constants/theme";
import { hp } from "@/lib/helpers/common";
import { StyleSheet, Text, View } from "react-native";

export const SectionView = ({ title, content }: { title: string; content: any }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp(2.4),
    fontWeight: theme.fonts.medium as "500",
    color: theme.colors.netural(0.8),
  },
});
