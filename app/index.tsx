import { Text, View } from "react-native";
import Reacct from "react";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

interface indexProps {}
function index() {
  const router = useRouter();
  return (
    <View>
      <Text>index</Text>
      <Button
        title="welecome"
        onPress={() => router.push("/welecome")}
      />
    </View>
  );
}

export default index;
