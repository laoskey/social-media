import { supabase } from "../supabase";
import { uploadFile } from "./imageService";

export const createOrUpdatePost = async (post: any) => {
  try {
    // upload file
    if (post.file && typeof post.file === "object") {
      let isImage = post?.file?.type === "image";
      let floderName = isImage ? "postImages" : "postVideos";
      let fileResult = await uploadFile(floderName, post?.file?.uri, isImage);

      if (fileResult.success) {
        post.file = fileResult.data;
      } else {
        return fileResult;
      }
    }

    // TODO:User can post image && video
    // TODO:uer can post mutilable files include img and video
    // upload posts
    const { data, error } = await supabase.from("posts").upsert(post).select().single();

    if (error) {
      console.log("[POST_CREATE_ERROR]", error);
      return { success: false, msg: "Could not create your post " };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("[POST ERROR]:", error);
    return {
      success: false,
      msg: "Could not create your post",
    };
  }
};
export const fetchPosts = async (limit = 10) => {
  console.log("FETCH POST", limit);
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*,user:users(id,name,image),post_likes(*)")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.log("[FETCH_POST_ERROR]", error);
      return { success: false, msg: "could not fetch the posts" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("[FETCH_POST_ERROR]:", error);
    return {
      success: false,
      msg: "Could not fetch the post",
    };
  }
};

export const removePostLike = async (postId: any, userId: any) => {
  try {
    const { data, error } = await supabase
      .from("post_likes")
      .delete()
      .eq("userId", userId)
      .eq("postId", postId);

    if (error) {
      console.log("[POST_REMOVE_LIKE_ERROR]", error);
      return { success: false, msg: "could not remove  the posts like" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("[POST_REMOVE_LIKE_ERROR]:", error);
    return {
      success: false,
      msg: "Could not remove the post like ",
    };
  }
};
export const createPostLike = async (postLike: any) => {
  try {
    const { data, error } = await supabase.from("post_likes").insert(postLike).select().single();

    if (error) {
      console.log("[POST_LIKE_ERROR]", error);
      return { success: false, msg: "could not like the posts" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("[POST_LIKE_ERROR]:", error);
    return {
      success: false,
      msg: "Could not like the post",
    };
  }
};
