import { View } from "react-native";
import CameraScreen from "../../src/components/Camera";

export default function Camera() {
  return (
    <View className="flex-1 w-full bg-brand-prune justify-center">
      <CameraScreen />
    </View>
  );
}