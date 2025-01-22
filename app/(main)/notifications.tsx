import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import { fetchNotifications } from "@/lib/services/notificationService";
import { useAuth } from "@/lib/contexts/AuthContext";
import { router } from "expo-router";
import { hp, wp } from "@/lib/helpers/common";
import { theme } from "@/constants/theme";
import ScreenWrapper from "@/components/ScreenWrapper";
import NotificationItem from "@/components/NotificationItem";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";

interface NotificationsProps {}
function Notifications() {
  // fetch the notifations
  // 1>reciverID =userID's notifications
  // 2>render the notifications
  //    2.1>if checked the notification ,remove this notification
  //    2.2>render other notifations

  const [notifications, setNotifications] = useState<any[] | undefined>([]);
  const { user } = useAuth();

  const handlenotificationEvent = async (payload: any) => {
    console.log("Got ost", payload);
    if (payload.eventType === "DELETE" && payload.old.id) {
      // refetch the posts data
      setNotifications((preNotify) => {
        let updateNotifications = preNotify?.filter(
          (notify: { id: string }) => notify.id !== payload.old.id
        );
        return updateNotifications;
      });
    }
  };
  useEffect(() => {
    let notificationChannel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        handlenotificationEvent
      )
      .subscribe();

    getNotifications();

    return () => {
      supabase.removeChannel(notificationChannel);
    };
  }, []);

  const getNotifications = async () => {
    if (user) {
      let res = await fetchNotifications(user.id);

      if (res.success) {
        setNotifications(res.data);
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Notifications" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
        >
          {notifications?.map((item) => {
            return (
              <NotificationItem
                key={item.id}
                item={item}
              />
            );
          })}
          {notifications?.length === 0 && <Text style={styles.noData}>No notifications yet</Text>}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  listStyle: {
    paddingVertical: 20,
    gap: 10,
  },
  noData: {
    fontSize: hp(1.8),
    fontWeight: theme.fonts.medium as "500",
    color: theme.colors.text,
    textAlign: "center",
  },
});
