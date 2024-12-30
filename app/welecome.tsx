import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import Reacct from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { hp, wp } from "@/helpers/common";
import image from "@/constants/image";
import { theme } from "@/constants/theme";

interface WelecomeProps {}
function Welecome() {
  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/*Welecome Image */}
        <Image
          style={styles.welecomeImage}
          source={image.welecome}
          resizeMode="contain"
        />
        {/* App name and punchline */}
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>LinkUp!</Text>
          <Text style={styles.punchline}>
            From breaking news and entertainment to sports and
            politics, get the full story with all the live commentary.
          </Text>
        </View>
        {/* Get starte button */}
      </View>
      {/* <TouchableOpacity onPress={() => router.back()}>
        <Text>GoBack</Text>
      </TouchableOpacity> */}
    </ScreenWrapper>
  );
}

export default Welecome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginHorizontal: wp(4),
  },
  welecomeImage: {
    marginTop: hp(10),
    height: hp(30),
    width: wp(100),
    alignSelf: "center",
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: theme.fonts.extraBold as "800",
  },
  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.text,
    // marginBottom: hp(10),
  },
});
