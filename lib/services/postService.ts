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
export const fetchPostDetails = async (postId: string) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*,user:users(id,name,image),post_likes(*),comments(*,users(id,name,image))")
      .eq("id", postId)
      .order("created_at", { ascending: false, foreignTable: "comments" })
      .single();

    if (error) {
      console.log("[FETCH_POST_DETAILS_ERROR]", error);
      return { success: false, msg: "could not fetch the post detail" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("[FETCH_POST_DETAILS_ERROR]:", error);
    return {
      success: false,
      msg: "Could not fetch the post",
    };
  }
};
export const fetchPosts = async (limit = 10, userId?: string) => {
  console.log("FETCH POST", limit);
  try {
    if (userId) {
      const { data, error } = await supabase
        .from("posts")
        .select("*,user:users(id,name,image),post_likes(*),comments(count)")
        .order("created_at", { ascending: false })
        .eq("userId", userId)
        .limit(limit);

      if (error) {
        console.log("[FETCH_POST_ERROR]", error);
        return { success: false, msg: "could not fetch the post details" };
      }

      return { success: true, data: data };
    } else {
      const { data, error } = await supabase
        .from("posts")
        .select("*,user:users(id,name,image),post_likes(*),comments(count)")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.log("[FETCH_POST_ERROR]", error);
        return { success: false, msg: "could not fetch the post details" };
      }

      return { success: true, data: data };
    }
  } catch (error) {
    console.log("[FETCH_POST_ERROR]:", error);
    return {
      success: false,
      msg: "Could not fetch the post detail",
    };
  }
};
export const removePost = async (postId: string) => {
  try {
    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      console.log("[REMOVE_POST_ERROR]", error);
      return { success: false, msg: "could not remove the post" };
    }

    return { success: true, msg: "post has been deleted", data: { postId } };
  } catch (error) {
    console.log("[REMOVE_POST_ERROR]:", error);
    return {
      success: false,
      msg: "Could not remove the post ",
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
export const createComment = async (comment: any) => {
  try {
    const { data, error } = await supabase.from("comments").insert(comment).select().single();

    if (error) {
      console.log("[CREATE_COMMENT_ERROR]", error);
      return { success: false, msg: "could not create the comments" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("[CREATE_COMMENT_ERROR]:", error);
    return {
      success: false,
      msg: "Could not create the comment",
    };
  }
};

export const removeComment = async (commentId: string) => {
  try {
    const { error } = await supabase.from("comments").delete().eq("id", commentId);

    if (error) {
      console.log("[REMOVE_COMMENT_ERROR]", error);
      return { success: false, msg: "could not remove the comment" };
    }

    return { success: true, msg: "comment has been deleted" };
  } catch (error) {
    console.log("[REMOVE_COMMENT_ERROR]:", error);
    return {
      success: false,
      msg: "Could not remove the comment ",
    };
  }
};
