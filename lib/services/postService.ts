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
