import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { hp } from "@/lib/helpers/common";
import { theme } from "@/constants/theme";
import Avatar from "./Avatar";
import moment from "moment";
import Icon from "@/assets/hugeicons";
import { useAuth } from "@/lib/contexts/AuthContext";

interface CommentItemProps {
  item: any;
  canDelete?: boolean;
  onDelete: (item: any) => {};
}
function CommentItem({ item, canDelete, onDelete }: CommentItemProps) {
  const { user } = useAuth();
  const createdAt = moment(item.created_at).format("MMM d");

  const commentOwnerStyle =
    user?.id === item.users.id
      ? {
          backgroundColor: "rgba(81, 207, 102,0.65)",
        }
      : { backgroundColor: "rgba(0,0,0,0.06)" };

  console.log(commentOwnerStyle);
  const handleDelete = () => {
    Alert.alert("Cnnfirm", "Are you want to delete this comment?", [
      { text: "cancle", onPress: () => console.log("modal cancelled"), style: "cancel" },
      { text: "Delete", onPress: () => onDelete(item), style: "destructive" },
    ]);
  };
  return (
    <View style={styles.containner}>
      <Avatar uri={item.users.image} />
      <View style={[styles.content, commentOwnerStyle]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={styles.nameContainer}>
            <Text style={styles.text}>{item?.users.name}</Text>
            <Text>•</Text>
            <Text style={styles.text}>{createdAt}</Text>
          </View>
          {canDelete && (
            <TouchableOpacity onPress={handleDelete}>
              <Icon
                name="delete"
                size={20}
                color={theme.colors.rose}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={[styles.text, { fontWeight: "normal" }]}>{item.text}</Text>
      </View>
    </View>
  );
}

export default CommentItem;

const styles = StyleSheet.create({
  text: {
    fontSize: hp(1.6),
    fontWeight: theme.fonts.medium as "500",
    color: theme.colors.textDark,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  highlight: {
    borderWidth: 0.2,
    borderColor: "white",
    borderCurve: "continuous",

    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  content: {
    borderCurve: "continuous",
    borderRadius: theme.radius.md,

    paddingHorizontal: 14,
    paddingVertical: 10,
    flex: 1,
    gap: 5,

    backgroundColor: "rgba(0,0,0,0.06)",
  },
  containner: {
    flex: 1,
    flexDirection: "row",
    gap: 7,
  },
});
