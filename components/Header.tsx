import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BackButton from "./BackButton";
import { hp } from "@/lib/helpers/common";
import { theme } from "@/constants/theme";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  mb?: number;
}
function Header({ title, showBackButton = true, mb = 10 }: HeaderProps) {
  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {showBackButton && (
        <View style={styles.showbackButton}>
          <BackButton />
        </View>
      )}
      {/* // TODO:fix the bug:Profile display Profil,miss the "e" */}
      <Text style={styles.title}>{`${title} ` || ""}</Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
  },
  showbackButton: {
    position: "absolute",
    left: 0,
  },
  title: {
    fontSize: hp(2.7),
    fontWeight: theme.fonts.semibold as "600",
    color: theme.colors.textDark,
    textTransform: "capitalize",
  },
});
