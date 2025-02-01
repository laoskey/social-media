import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "@/lib/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { router, Stack } from "expo-router";
import { User } from "@supabase/supabase-js";
import { getUserData } from "@/lib/services/useService";
import { JsStack } from "@/components/JsStack";
import { TransitionPresets } from "@react-navigation/stack";

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

interface MainLayoutProps {}
function MainLayout() {
  const { setAuth, user, setUserData } = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // set auth
        setAuth(session?.user);
        // console.log(session.user);
        updateUserData(session.user, session.user.email as string);
        // move to home screen
        router.push("/(main)/toasts/home");
        // TODO:Modify the route
      } else {
        // set auth null
        setAuth(null);
        // move to welecome  // set auth

        router.replace("/welecome");
      }
    });
  }, []);

  const updateUserData = async (user: User, email: string) => {
    const res = await getUserData(user?.id);

    if (res.success) {
      setUserData({ ...res.data, email });
    }
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen
        name="postDetails"
        options={{
          presentation: "modal",
        }}
      /> */}
      {/* TODO:the  presentation:"modal" doesn't work in Android, need manually config postDetails styles in the furture */}
      <JsStack.Screen
        key={"postDetails"}
        name="postDetails"
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          presentation: "modal",
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}

export default _layout;

const styles = StyleSheet.create({});
