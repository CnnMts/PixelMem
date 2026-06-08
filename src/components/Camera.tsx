import CameraService from "../services/CameraService";
import { View } from "react-native";

export default function CameraScreen() {
  return (
    <View style={{ flex: 1 }}>
      <CameraService />
    </View>
  );
}