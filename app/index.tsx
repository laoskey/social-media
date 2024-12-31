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
  const { setAuth } = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // set auth
        setAuth(session?.user);
        // move to home screen
        router.replace("/(main)/home");
      } else {
        // set auth null
        setAuth(null);
        // move to welecome  // set auth

        router.replace("/welecome");
      }
    });
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Loading />
    </View>
  );
}

export default index;
