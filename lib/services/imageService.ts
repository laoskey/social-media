export const getUserImageSrc = (imagePath?: string | null) => {
  if (imagePath) {
    return { uri: imagePath };
  } else {
    return require("@/assets/images/avatar.jpg");
  }
};

export const uploadFile = async (floderName: string, fileUri: string, isImage = true) => {
  try {
    let fileName = "";
  } catch (error) {
    console.log("[UPLOAD_FILE]:", error);
    return { success: false, msg: "Can not upload the file " };
  }
};

export const getFilePath = (floderName: string, isImage: boolean) => {
  return `/${floderName}/${new Date().getTime()}${isImage ? "png" : "mp4"}`;
};
