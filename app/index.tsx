import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import CustomButton from "@/components/Button";
import { supabase } from "@/lib/supabase";
import Loading from "@/components/Loading";
import { useAuth } from "@/lib/contexts/AuthContext";
import { hp } from "@/lib/helpers/common";

interface indexProps {}
function index() {
  const router = useRouter();
  // const { setAuth } = useAuth();

  // useEffect(() => {
  //   router.push("/(main)/home");
  // }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <Loading />
      <CustomButton
        title="Go Home"
        buttonStyle={{ width: hp(30) }}
        onPress={() => router.push("/(main)/toasts/home")}
      />
      <CustomButton
        title="Go Piex"
        buttonStyle={{ width: hp(30) }}
        onPress={() => router.push("/(main)/toasts/home")}
      />
    </View>
  );
}

export default index;
