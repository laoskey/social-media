import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Home from "./Home";
import { SvgProps } from "react-native-svg";
import { theme } from "@/constants/theme";
import Mail from "./Mail";
import Lock from "./Lock";

const icons: { [key: string]: (props: SvgProps) => JSX.Element } = {
  home: Home,
  mail: Mail,
  lock: Lock,
  // user: User,
  // heart: Heart,
  // plus: Plus,
  // search: Search,
  // location: Location,
  // call: Call,
  // camera: Camera,
  // edit: Edit,
  // arrowLeft: ArrowLeft,
  // threeDotsCircle: ThreeDotsCircle,
  // threeDotsHorizontal: ThreeDotsHorizontal,
  // comment: Comment,
  // share: Share,
  // send: Send,
  // delete: Delete,
  // logout: Logout,
  // image: Image,
  // video: Video,
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}
function Icon({ name, ...props }: IconProps) {
  const IconComponent = icons[name];
  return (
    <IconComponent
      height={props.size || 24}
      width={props.size || 24}
      color={theme.colors.textLight}
      strokeWidth={props.strokeWidth || 1.9}
      {...props}
    />
  );
}

export default Icon;

const styles = StyleSheet.create({});
