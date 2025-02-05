import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const hp = (percentage: number) => {
  return (percentage * deviceHeight) / 100;
};
export const wp = (percentage: number) => {
  return (percentage * deviceWidth) / 100;
};

export const stripHTMLTags = (html: any) => {
  return html.replace(/<[^>]*>?/gm, "");
};

// Pixels grid
export const getColumeCount = () => {
  if (deviceWidth >= 1024) {
    return 4; //desktop
  } else if (deviceWidth >= 768) {
    return 3; // tablet
  } else {
    // phone
    return 2;
  }
};

export const getImageSize = (height: number, width: number) => {
  if (width > height) {
    // landscape
    return 250;
  } else if (width < height) {
    // portrait
    return 300;
  } else {
    // square
    return 200;
  }
};
