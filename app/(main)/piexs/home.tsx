import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/helpers/common";

interface PixelHomeProps {}
function PixelHome() {
  const [search, setSearch] = useState<string | null>("");
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  return (
    <View style={[styles.container, { padding: paddingTop }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.netural(0.7)}
          />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {/* Search bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.netural(0.5)}
            />
          </View>
          <TextInput
            placeholder="Search for photos..."
            style={styles.searchInput}
            onChangeText={(value) => setSearch(value)}
          />
          <Pressable style={styles.closeIcon}>
            <Ionicons
              name="close"
              size={24}
              color={theme.colors.netural(0.5)}
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

export default PixelHome;

const styles = StyleSheet.create({
  container: { flex: 1, gap: 15 },
  header: {
    marginHorizontal: wp(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fonts.semibold as "600",
    color: theme.colors.netural(0.9),
  },
  searchBar: {
    marginHorizontal: wp(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: { padding: 8 },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.netural(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
});
