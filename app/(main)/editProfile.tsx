import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { hp, wp } from "@/lib/helpers/common";
import { theme } from "@/constants/theme";
import { Image } from "expo-image";
import { Pressable } from "react-native";
import Icon from "@/assets/hugeicons";
import { useAuth } from "@/lib/contexts/AuthContext";
import { getUserImageSrc, uploadFile } from "@/lib/services/imageService";
import Input from "@/components/TextInput";
import CustomButton from "@/components/Button";
import { updateUser } from "@/lib/services/useService";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import image from "@/constants/image";

interface UserImage {
  uri: string;
}
interface User {
  name: string;
  phone_number: string;
  image: string | UserImage | null;
  bio: string;
  address: string;
}
interface EditProfileProps {}
function EditProfile() {
  const { user: currentUser, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    name: "",
    phone_number: "",
    image: "",
    bio: "",
    address: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.name || "",
        phone_number: currentUser.phone_number || "",
        image: currentUser.image || "",
        bio: currentUser.bio || "",
        address: currentUser.address || "",
      });
    }
  }, [currentUser]);

  const onPickImage = async () => {
    // TODO :pick image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    });

    if (!result.canceled) {
      setUserData({ ...user, image: result.assets[0] });
    }

    console.log(user.image);
  };
  const onSubmit = async () => {
    let userData = { ...user };

    let { name, address, bio, image, phone_number } = userData;
    if (!name || !phone_number || !address || !bio || !image) {
      Alert.alert("Profile", "Please fill all the fields");
      return;
    }

    setLoading(true);

    // update image
    if (typeof image == "object") {
      let imageRes = await uploadFile("profile", image?.uri, true);

      if (imageRes.success) {
        userData.image = imageRes.data as string;
      } else {
        userData.image = null;
      }
    }
    const res = await updateUser(currentUser?.id as string, userData);
    setLoading(false);
    console.log("[Updata user result]:", res);

    if (res.success) {
      setUserData({ ...currentUser, ...userData });
      router.back();
    }
  };

  let imageSource =
    user.image && typeof user.image === "object" ? user.image?.uri : getUserImageSrc(user?.image);
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Header title="Edit Profile" />
          {/* Form */}
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image
                source={imageSource}
                style={styles.avatar}
              />
              <Pressable
                style={styles.cameraIcon}
                onPress={onPickImage}
              >
                <Icon
                  name="camera"
                  size={20}
                  strokeWidth={2.5}
                />
              </Pressable>
            </View>
            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
              Please fill yur profile details
            </Text>
            <Input
              icon={<Icon name="user" />}
              placeholder="Enter your name"
              value={user.name}
              onChangeText={(value: any) => {
                setUser({ ...user, name: value });
              }}
            />
            <Input
              icon={<Icon name="call" />}
              placeholder="Enter your phone number"
              value={user.phone_number}
              onChangeText={(value: any) => {
                setUser({ ...user, phone_number: value });
              }}
            />
            <Input
              icon={<Icon name="location" />}
              placeholder="Enter your address"
              value={user.address}
              onChangeText={(value: any) => {
                setUser({ ...user, address: value });
              }}
            />
            <Input
              placeholder="Enter your bio"
              value={user.bio}
              multiline={true}
              containerStyle={styles.bio}
              onChangeText={(value: any) => {
                setUser({ ...user, bio: value });
              }}
            />

            <CustomButton
              title="Update"
              loading={loading}
              onPress={onSubmit}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: wp(4) },
  avatarContainer: {
    height: hp(14),
    width: hp(14),
    alignSelf: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: theme.radius.xxl * 1.8,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: theme.colors.darkLight,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: -10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  form: {
    gap: 18,
    marginTop: 20,
  },
  input: {
    flexDirection: "row",
    padding: 17,
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: "continuous",
    paddingHorizontal: 20,
    gap: 15,
  },
  bio: {
    flexDirection: "row",
    height: hp(15),
    alignItems: "flex-start",
    paddingVertical: 15,
  },
});
