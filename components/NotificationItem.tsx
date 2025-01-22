import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import { hp } from "@/lib/helpers/common";
import Avatar from "./Avatar";
import moment from "moment";
import { router } from "expo-router";
import { removeNotification } from "@/lib/services/notificationService";

interface NotificationItemProps {
  item: any;
  router?: () => void;
}
function NotificationItem({ item }: NotificationItemProps) {
  const handleClick = async () => {
    const res = await removeNotification(item?.id);
    if (!res.success) {
      console.log("Notification", res.msg);
    }
    // open post detais
    let { postId, commentId } = JSON.parse(item?.data);
    router.push({
      pathname: "/(main)/postDetails",
      params: {
        postId,
        commentId,
      },
    });
  };

  const CreatedAt = moment(item.created_at).format("MMM d");
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleClick}
    >
      {/* Avatar */}
      <Avatar
        uri={item?.sender?.image}
        size={hp(5)}
      />
      <View style={styles.nameTitle}>
        <Text style={styles.text}>{item.sender.name}</Text>
        <Text style={[styles.text, { color: theme.colors.textDark }]}>{item.title}</Text>
      </View>
      <Text style={[styles.text, { color: theme.colors.textLight }]}>{CreatedAt}</Text>
    </TouchableOpacity>
  );
}

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: theme.colors.darkLight,
    padding: 5,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  nameTitle: {
    flex: 1,
    gap: 2,
  },
  text: {
    fontSize: hp(1.6),
    fontWeight: theme.fonts.medium as "500",
    color: theme.colors.text,
  },
});
