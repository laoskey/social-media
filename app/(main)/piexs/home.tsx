import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
  NativeSyntheticEvent,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { debounce } from "lodash";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/lib/helpers/common";
import { apiCall } from "@/lib/api";
import Categories from "@/components/pixels/Categories";
import ImageGrid from "@/components/pixels/ImageGrid";
import FilterModal from "@/components/pixels/FilterModal";
import { NativeScrollEvent } from "react-native";

var page = 1;
interface PixelHomeProps {}
function PixelHome() {
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [isEndReached, setIsEndReached] = useState(false);
  const [filters, setFilters] = useState<any>(null);
  const [images, setImages] = useState<any>([]);
  const searchInputRef = useRef<TextInput>(null);
  const modalRef = useRef<BottomSheetModal>(null);
  const scrollRef = useRef<ScrollView>(null);
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params: { page: number; q?: string } = { page: 1 }, append = true) => {
    // console.log("parms:", params, append);
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
  const openFilterModal = () => {
    modalRef.current?.present();
  };
  const closeFilterModal = () => {
    modalRef.current?.close();
  };

  const handleApplyFliters = () => {
    if (filters) {
      page = 1;
      setImages([]);
      let params = {
        page,
        ...filters,
      };

      if (activeCategory) {
        params.category = activeCategory;
      }
      if (search) {
        params.q = search;
      }

      fetchImages(params, false);
    }
    closeFilterModal();
  };

  const handleResetFliters = () => {
    if (filters) {
      page = 1;
      setFilters(null);
      setImages([]);
      let params: {
        page: number;
        category?: any;
        q?: string;
      } = {
        page,
      };
      if (activeCategory) {
        params.category = activeCategory;
      }
      if (search) {
        params.q = search;
      }

      fetchImages(params, false);
    }
    closeFilterModal();
  };
  const handleChangeCategory = (cat: any) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);

    page = 1;

    let params: {
      page: number;
      category?: string;
    } = {
      page,
      ...filters,
    };

    if (cat) {
      params.category = cat;
    }
    fetchImages(params, false);
  };

  const handleSearch = (text: string) => {
    // console.log("search for", text);
    setSearch(text);

    if (text.length > 2) {
      // search for this text
      page = 1;
      setImages([]);
      setActiveCategory(null); // clear the category when user searching
      fetchImages({ page, q: text, ...filters });
    }
    if (text === "") {
      // reset results
      page = 1;
      setImages([]);
      setActiveCategory(null); // clear the category when user searching
      searchInputRef.current?.clear();
      fetchImages({ page, ...filters });
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const clearSearch = () => {
    setSearch("");
    searchInputRef.current?.clear();
  };

  const clearThisFilter = (filterName: string) => {
    let filterc = { ...filters };
    delete filterc[filterName];
    setFilters({ ...filterc });

    setImages([]);

    page = 1;
    let params: {
      page: number;
      category?: any;
      q?: string;
    } = {
      page,
      ...filterc,
    };
    if (activeCategory) {
      params.category = activeCategory;
    }
    if (search) {
      params.q = search;
    }

    fetchImages(params, false);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;

    if (scrollOffset >= bottomPosition - 1) {
      if (!isEndReached) {
        setIsEndReached(true);
        // fetch more images
        page++;
        let params: {
          page: number;
          category?: any;
          q?: string;
        } = {
          page,
          ...filters,
        };
        if (activeCategory) {
          params.category = activeCategory;
        }
        if (search) {
          params.q = search;
        }
        console.log("reached end,page:", page);
        fetchImages(params);
      } else if (isEndReached) {
        setIsEndReached(false);
      }
    }
  };
  const handleScrollUp = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  // console.log(filters);
  return (
    <View style={[styles.container, { paddingTop: paddingTop }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable onPress={openFilterModal}>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.netural(0.7)}
          />
        </Pressable>
      </View>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={5} // how often scroll event will fire whiel scrolling (in ms)
        ref={scrollRef}
        contentContainerStyle={{ gap: 15 }}
      >
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
        {/* filters */}
        {filters && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filters}
          >
            {Object.keys(filters).map((key, index) => {
              return (
                <View
                  key={key}
                  style={styles.filterItem}
                >
                  {key === "colors" ? (
                    <View
                      style={{ height: 30, width: 40, borderRadius: 7, backgroundColor: filters[key] }}
                    />
                  ) : (
                    <Text style={styles.filterItemText}>{filters[key]}</Text>
                  )}
                  <Pressable
                    style={styles.filterCloseIcon}
                    onPress={() => clearThisFilter(key)}
                  >
                    <Ionicons
                      name="close"
                      size={14}
                      color={theme.colors.netural(0.9)}
                    />
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        )}
        {/* Images grid */}
        <View>{images.length > 0 && <ImageGrid images={images} />}</View>
        {/* Loading */}
        <View style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}>
          <ActivityIndicator size={"large"} />
        </View>
      </ScrollView>
      {/* Filters modal */}
      <FilterModal
        modalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        onClose={closeFilterModal}
        onApply={handleApplyFliters}
        onReset={handleResetFliters}
      />
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
  filters: { paddingHorizontal: wp(4), gap: 10 },
  filterItem: {
    backgroundColor: theme.colors.grayBg,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.radius.xs,
    gap: 10,
    paddingHorizontal: 10,
  },
  filterItemText: {
    fontSize: hp(1.4),
  },
  filterCloseIcon: {
    backgroundColor: theme.colors.netural(0.2),
    padding: 4,
    borderRadius: 7,
  },
});
