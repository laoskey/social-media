import { theme } from "@/constants/theme";
import { capitalize, hp } from "@/lib/helpers/common";
import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const SectionView = ({ title, content }: { title: string; content: any }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};

export const CommenFilterRow = ({
  data,
  filters,
  filterName,
  setFilters,
}: {
  data: [];
  filters: any;
  setFilters: Dispatch<SetStateAction<null>>;
  filterName: string;
}) => {
  const onSelect = (item: any) => {
    setFilters({ ...filters, [filterName]: item });
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item, index) => {
          let isActive = filters && filters[filterName] === item;
          let backgroundColor = isActive ? theme.colors.netural(0.7) : "white";
          let color = isActive ? "white" : theme.colors.netural(0.7);
          return (
            <Pressable
              style={[styles.outlineButton, { backgroundColor }]}
              key={item}
              onPress={() => onSelect(item)}
            >
              <Text style={[styles.outlineButtonText, { color }]}>{capitalize(item)}</Text>
            </Pressable>
          );
        })}
    </View>
  );
};
export const ColorFilterRow = ({
  data,
  filters,
  filterName,
  setFilters,
}: {
  data: [];
  filters: any;
  setFilters: Dispatch<SetStateAction<null>>;
  filterName: string;
}) => {
  const onSelect = (item: any) => {
    setFilters({ ...filters, [filterName]: item });
  };

  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item, index) => {
          let isActive = filters && filters[filterName] === item;
          let borderColor = isActive ? theme.colors.netural(0.4) : "white";

          return (
            <Pressable
              key={item}
              onPress={() => onSelect(item)}
            >
              <View style={[styles.colorWrapper, { borderColor }]}>
                <View style={[styles.color, { backgroundColor: item }]} />
              </View>
            </Pressable>
          );
        })}
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
  flexRowWrap: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  outlineButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.grayBg,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },
  outlineButtonText: {},
  colorWrapper: {
    padding: 3,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderCurve: "continuous",
  },
  color: {
    height: 30,
    width: 40,
    borderCurve: "continuous",
    borderRadius: theme.radius.sm - 3,
  },
});
