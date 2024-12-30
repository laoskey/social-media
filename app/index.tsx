import { Text, View } from "react-native";
import Reacct from "react";
import { useRouter } from "expo-router";
import CustomButton from "@/components/Button";

interface indexProps {}
function index() {
  const router = useRouter();
  return (
    <View>
      <Text>index</Text>
      <CustomButton
        title="welecome"
        onPress={() => router.push("/welecome")}
      />
    </View>
  );
}

export default index;
