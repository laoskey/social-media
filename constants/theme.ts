import { opacity } from "react-native-reanimated/lib/typescript/Colors";

export const theme = {
  colors: {
    primary: "#00c26f",
    primaryDark: "#00ac62",
    dark: "#3e3e3e",
    gray: "#e3e3e3",
    darkLight: "#e1e1e1",

    text: "#494949",
    textLight: "#7c7c7c",
    textDark: "#1d1d1d",

    rose: "#ef4444",
    roseLight: "#f87171",
    roleBG: "#fee2e2",

    border: "rgba(0, 0, 0, 0.1)",
    backdrop: "rgba(0, 0, 0, 0.5)",

    // Piexs
    netural: (opacity: any) => `rgba(10,10,10,${opacity})`,
    white: "#fff",
    black: "#000",
    grayBg: "#e5e5e5",
  },
  fonts: {
    medium: "500",
    semibold: "600",
    bold: "700",
    extraBold: "800",
  },
  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
  },
};
