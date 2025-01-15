import * as FileSystemm from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from "../supabase";

export const getUserImageSrc = (imagePath?: string | null) => {
  if (imagePath) {
    // return { uri: imagePath };
    return getSupabaseFileUrl(imagePath);
  } else {
    return require("@/assets/images/avatar.jpg");
  }
};

export const uploadFile = async (floderName: string, fileUri: string, isImage = true) => {
  try {
    let fileName = getFilePath(floderName, isImage);
    // 1> supabase storage api with RN: Upload file using ArrayBuffer from base64 file data instead
    const fileBase64 = await FileSystemm.readAsStringAsync(fileUri, {
      encoding: FileSystemm.EncodingType.Base64,
    });
    // 2>add the data to the array buffer
    let imageData = decode(fileBase64); // array buffer

    // 3>upload file
    const { data, error } = await supabase.storage.from("uploads").upload(fileName, imageData, {
      contentType: isImage ? "image/*" : "video/*",
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      console.log("[UPLOAD_FILE]:", error);
      return { success: false, msg: "Can not upload the file " };
    }

    return { success: true, data: data.path };
  } catch (error) {
    console.log("[UPLOAD_FILE]:", error);
    return { success: false, msg: "Can not upload the file " };
  }
};

export const getFilePath = (floderName: string, isImage: boolean) => {
  return `/${floderName}/${new Date().getTime()}${isImage ? ".png" : ".mp4"}`;
};

export const getSupabaseFileUrl = (filepath: string) => {
  if (filepath) {
    return {
      uri: `https://vudhpllljeppzhxagybr.supabase.co/storage/v1/object/public/uploads/${filepath}`,
    };
  }

  return null;
};

export const downloadFile = async (url: any) => {
  try {
    const { uri } = await FileSystemm.downloadAsync(url, getLocalFilePath(url));

    return uri;
  } catch (error) {
    return null;
  }
};

export const getLocalFilePath = (filePath: string) => {
  let fileName = filePath.split("/").pop();

  return `${FileSystemm.documentDirectory}${fileName}`;
};
