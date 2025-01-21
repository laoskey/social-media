import { supabase } from "../supabase";

export const createNotification = async (notificatioon: any) => {
  try {
    const { data, error } = await supabase.from("notifications").insert(notificatioon).select().single();

    if (error) {
      console.log("[NOTIFICATION_ERROR]", error);
      return { success: false, msg: "Somethin went wrong:could not create notification" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("[NOTIFICATION_ERROR]:", error);
    return {
      success: false,
      msg: "Could not create notification ",
    };
  }
};
export const fetchNotifications = async (receiverId: string) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*, sender:senderId(id,name,image)")
      .eq("receiverId", receiverId)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("[FETCH_NOTIFICATIONS_ERROR]", error);
      return { success: false, msg: "could not fetch the notification " };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("[FETCH_NOTIFICATIONS_ERROR]:", error);
    return {
      success: false,
      msg: "Could not fetch the notification",
    };
  }
};
