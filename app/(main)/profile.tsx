import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/lib/contexts/AuthContext";
import Loading from "@/components/Loading";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import { hp, wp } from "@/lib/helpers/common";
import Icon from "@/assets/hugeicons";
import { theme } from "@/constants/theme";
import { supabase } from "@/lib/supabase";
import Avatar from "@/components/Avatar";
import { fetchPosts } from "@/lib/services/postService";
import PostCard from "@/components/PostCard";

var limit = 0;
interface ProfileProps {}
function Profile() {
  const { user, setAuth } = useAuth();
  const [posts, setPosts] = useState<any[] | undefined>([]);
  const [hasMore, setHasmMore] = useState(true);
  const router = useRouter();

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Sign out", "Error signing out");
    }
  };

  const getPosts = async () => {
    if (!hasMore) {
      return null;
    }

    limit += 10;
    const res = await fetchPosts(limit, user?.id);

    if (res.success) {
      if (posts?.length === res.data?.length) {
        setHasmMore(false);
      }

      setPosts(res.data);
    }
  };
  const handleLogout = async () => {
    Alert.alert("Cnnfirm", "Are you want to lo out?", [
      { text: "cancle", onPress: () => console.log("modal cancelled"), style: "cancel" },
      { text: "Logout", onPress: () => onLogout(), style: "destructive" },
    ]);
  };
  if (user === undefined) {
    return <Loading />;
  }

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <ScreenWrapper bg="white">
      <FlatList
        // TODO:FIX:when first posts loading, the FLatlist will re-call the getPosts(),until the Posts data revive,
        // it's destory the getPost'limit ,should add some logic to control rendering the FlatList
        ListHeaderComponent={
          <UserHeader
            user={user}
            router={router}
            onPress={handleLogout}
          />
        }
        ListHeaderComponentStyle={{ marginBottom: 30 }}
        data={posts}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listStyle}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={10}
        onEndReached={() => {
          console.log("Got to the end");
          getPosts();
        }}
        onEndReachedThreshold={0}
        renderItem={(item) => (
          <PostCard
            item={item}
            currentUser={user}
            // router={() => router}
          />
        )}
        ListFooterComponent={
          hasMore ? (
            <View style={{ marginBottom: posts?.length === 0 ? 200 : 30 }}>
              <Loading />
            </View>
          ) : (
            <View style={{ marginVertical: 30 }}>
              <Text style={styles.noPosts}>No more posts</Text>
            </View>
          )
        }
      />
    </ScreenWrapper>
  );
}

const UserHeader = ({ user, router, onPress }: { user: any; router: any; onPress: () => void }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: wp(4) }}>
      <View>
        <Header
          title="profile"
          mb={30}
        />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onPress}
        >
          <Icon
            name="logout"
            color={theme.colors.rose}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{ gap: 15 }}>
          <View style={styles.avatarContainer}>
            <Avatar
              uri={user?.image}
              size={hp(12)}
              rounded={theme.radius.xxl * 1.4}
            />
            <Pressable
              style={styles.editIcon}
              onPress={() => router.push("/editProfile")}
            >
              <Icon
                name="edit"
                size={28}
                strokeWidth={2.5}
              />
            </Pressable>
          </View>

          {/* User name && address */}
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={styles.userName}>{user && user.name}</Text>
            <Text style={styles.infoText}>{user && user.address}</Text>
          </View>
          {/* Email,pgone,bio */}

          <View style={{ gap: 10 }}>
            <View style={styles.info}>
              <Icon
                name="mail"
                size={20}
                color={theme.colors.textLight}
              />
              <Text style={styles.infoText}>{user && user.email}</Text>
            </View>
            {user && user.phone_number && (
              <View style={styles.info}>
                <Icon
                  name="call"
                  size={20}
                  color={theme.colors.textLight}
                />
                <Text style={styles.infoText}>{user && user.phone_number}</Text>
              </View>
            )}
            {/* TODO:Add the bio icon */}
            {user && user.bio && <Text style={styles.infoText}>{user.bio}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    marginHorizontal: wp(4),
    marginBottom: 20,
  },
  headerShape: {
    width: wp(100),
    height: hp(20),
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  userName: {
    fontSize: hp(3),
    fontWeight: theme.fonts.medium as "500",
    color: theme.colors.textDark,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: theme.fonts.medium as "500",
    color: theme.colors.textLight,
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.roleBG,
  },
  listStyle: { paddingHorizontal: wp(4), paddingBottom: 30 },
  noPosts: { fontSize: hp(2), textAlign: "center", color: theme.colors.text },
});
