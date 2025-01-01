import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "@/lib/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { router, Stack } from "expo-router";
import { User } from "@supabase/supabase-js";

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

interface MainLayoutProps {}
function MainLayout() {
  const { setAuth } = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // set auth
        setAuth(session?.user);
        // console.log(session.user);
        updateUserData(session.user);
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

  const updateUserData = async (user: User) => {
    console.log("Update:", user);
  };
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default MainLayout;

const styles = StyleSheet.create({});
