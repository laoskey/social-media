import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/helpers/common";
import Categories from "@/components/pixels/Categories";
import { apiCall } from "@/lib/api";
import ImageGrid from "@/components/pixels/ImageGrid";

import { debounce } from "lodash";
import { FA6Style } from "@expo/vector-icons/build/FontAwesome6";

var page = 1;
interface PixelHomeProps {}
function PixelHome() {
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState<any>([]);
  const searchInputRef = useRef<TextInput>(null);
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params: { page: number; q?: string } = { page: 1 }, append = false) => {
    console.log("parms:", params, append);
    const res = await apiCall(params);
    if (res.success && res?.data?.hits) {
      if (append) {
        setImages([...images, ...res.data.hits]);
      } else {
        setImages([...res.data.hits]);
      }
    }
    // console.log(images.length);
  };
  const handleChangeCategory = (cat: any) => {
    setActiveCategory(cat);
  };

  const handleSearch = (text: string) => {
    console.log("search for", text);
    setSearch(text);

    if (text.length > 2) {
      // search for this text
      page = 1;
      setImages([]);
      fetchImages({ page, q: text });
    }
    if (text === "") {
      // reset results
      page = 1;
      setImages([]);
      searchInputRef.current?.clear();
      fetchImages({ page });
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const clearSearch = () => {
    setSearch("");
    searchInputRef.current?.clear();
  };
  return (
    <View style={[styles.container, { paddingTop: paddingTop }]}>
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
            // value={search}
            onChangeText={handleTextDebounce}
            // onChangeText={(value) => setSearch(value)}
            ref={searchInputRef}
          />

          {search && (
            <Pressable
              style={styles.closeIcon}
              onPress={() => handleSearch("")}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.netural(0.5)}
              />
            </Pressable>
          )}
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        {/* Images grid */}
        <View>{images.length > 0 && <ImageGrid images={images} />}</View>
      </ScrollView>
    </View>
  );
}

export default PixelHome;

const styles = StyleSheet.create({
  container: { flex: 1, gap: 15 },
  header: {
    marginHorizontal: wp(4),

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
    marginHorizontal: wp(4),
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
  categories: {},
});
