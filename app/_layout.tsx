import { Stack } from "expo-router";
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import "../global.css";
import { CameraProvider } from "../src/context/CameraContext";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {
  return (
    <CameraProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(pages)" />
    </Stack>
    </CameraProvider>
  );
}