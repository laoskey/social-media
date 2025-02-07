import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { theme } from "@/constants/theme";
import { BlurView } from "expo-blur";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { hp } from "@/lib/helpers/common";
import { SectionView } from "./FliterView";

interface FilterModalProps {
  modalRef: any;
}
function FilterModal({ modalRef }: FilterModalProps) {
  const snapPoints = useMemo(() => ["65%"], []);
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
            return (
              <View key={sectionName}>
                <SectionView
                  title={sectionName}
                  content={sectionView({})}
                />
              </View>
            );
          })}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
type SectionName = keyof typeof sections;
const sections = {
  order: (props: any) => <OrderView {...props} />,
  orientation: (props: any) => <OrderView {...props} />,
  image_type: (props: any) => <OrderView {...props} />,
  colors: (props: any) => <OrderView {...props} />,
};

const OrderView = () => {
  return (
    <View>
      <Text>Order View</Text>
    </View>
  );
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
    width: "100%",
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
});
