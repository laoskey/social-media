import { supabase } from "../supabase";

export const getUserData = async (userId: string) => {
  try {
    const { data, error } = await supabase.from("users").select().eq("id", userId).single();
    if (error) {
      return { success: false, msg: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.log("[getUserData]:", error);
    return { success: false, msg: error };
  }
};
