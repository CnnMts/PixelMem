import { useRef } from 'react';
import { CameraView } from 'expo-camera';
import { useCamera } from '../context/CameraContext';
import { useRouter } from 'expo-router';

export function usePhoto() {
  const cameraRef = useRef<CameraView>(null);
  const { addPhoto } = useCamera();
  const router = useRouter();                     

  async function takePhoto() {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
      base64: false,
      exif: false,
    });

    if (photo) {
      addPhoto({ uri: photo.uri, date: new Date().toISOString() });
      router.push("/(pages)/GalleryPage");
    }
  }

  return { cameraRef, takePhoto };
}