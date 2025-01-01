import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import CustomButton from "@/components/Button";
import { useAuth } from "@/lib/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface HomeProps {}
function Home() {
  const { user, setAuth } = useAuth();

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Sign out", "Error signing out");
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <Text>Home</Text>
        <CustomButton
          title="Logout"
          onPress={onLogout}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

export default Home;

const styles = StyleSheet.create({});
