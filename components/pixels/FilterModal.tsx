import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { theme } from "@/constants/theme";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { capitalize, hp } from "@/lib/helpers/common";
import { ColorFilterRow, CommenFilterRow, SectionView } from "./FliterView";
import { data } from "@/constants/data";

interface FilterModalProps {
  modalRef: any;
  filters: any;
  setFilters: Dispatch<SetStateAction<null>>;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
}
function FilterModal({ modalRef, filters, setFilters, onClose, onApply, onReset }: FilterModalProps) {
  const snapPoints = useMemo(() => ["75%"], []);
  return (
    <BottomSheetModal
      ref={modalRef}
      //   onChange={handleSheetChanges}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.fliterText}>Filters</Text>
          {Object.keys(sections).map((sectionName, index) => {
            let sectionView = sections[sectionName as SectionName];
            let sectionData = data.filters[sectionName as SectionName];
            let title = capitalize(sectionName);
            return (
              <Animated.View
                entering={FadeInDown.delay(index * 100 + 100)
                  .springify()
                  .damping(11)}
                key={sectionName}
              >
                <SectionView
                  title={title}
                  content={sectionView({
                    data: sectionData,
                    filters,
                    setFilters,
                    filterName: sectionName,
                  })}
                />
              </Animated.View>
            );
          })}

          {/* Actions */}
          <Animated.View
            entering={FadeInDown.delay(500).springify().damping(11)}
            style={styles.buttons}
          >
            <Pressable
              style={styles.resetButton}
              onPress={onReset}
            >
              <Text style={[styles.buttonText, { color: theme.colors.netural(0.9) }]}>Reset</Text>
            </Pressable>
            <Pressable
              style={styles.applyButton}
              onPress={onApply}
            >
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>Apply</Text>
            </Pressable>
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

type SectionName = keyof typeof sections;
const sections = {
  order: (props: any) => <CommenFilterRow {...props} />,
  orientation: (props: any) => <CommenFilterRow {...props} />,
  image_type: (props: any) => <CommenFilterRow {...props} />,
  colors: (props: any) => <ColorFilterRow {...props} />,
};

const CustomBackdrop = (animatedIndex: any, style: any) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(animatedIndex.animatedIndex.value, [-1, 0], [0, 1], Extrapolation.CLAMP);
    return { opacity };
  });
  const containerStyle = [StyleSheet.absoluteFill, style, styles.overLay, containerAnimatedStyle];
  return (
    <Animated.View style={containerStyle}>
      {/* blur view */}
      <BlurView //TODO:make blurview work
        style={StyleSheet.absoluteFill}
        tint="dark"
        intensity={25}
      />
    </Animated.View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerStyle: {},
  overLay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    flex: 1,
    // width: "100%",
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // backgroundColor: "orangered",
  },
  fliterText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.semibold as "600",
    color: theme.colors.netural(0.8),
    marginBottom: 5,
  },
  buttons: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 8,
  },
  resetButton: {
    flex: 1,
    backgroundColor: theme.colors.netural(0.05),
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
    borderWidth: 2,
    borderColor: theme.colors.grayBg,
  },
  applyButton: {
    flex: 1,
    backgroundColor: theme.colors.netural(0.8),
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
  },
  buttonText: { fontSize: hp(2.2) },
});
