import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import CustomButton from "@/components/Button";
import { supabase } from "@/lib/supabase";
import Loading from "@/components/Loading";
import { useAuth } from "@/lib/contexts/AuthContext";

interface indexProps {}
function index() {
  const router = useRouter();
  // const { setAuth } = useAuth();

  // useEffect(() => {
  //   router.push("/(main)/home");
  // }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Loading />
      <CustomButton
        title="Go welecome"
        onPress={() => router.push("/(main)/home")}
      />
    </View>
  );
}

export default index;
