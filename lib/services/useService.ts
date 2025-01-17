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
export const updateUser = async (userId: string, data: any) => {
  // opyional:build the udate data

  // update data
  try {
    const { error } = await supabase.from("users").update(data).eq("id", userId);
    if (error) {
      console.log("[UPDATEUSER:]", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.log("[UpdateUser]:", error);
    return { success: false, msg: error };
  }
};
