import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Text, TouchableOpacity, View, Pressable, StyleSheet } from 'react-native';
import { usePhoto } from '../hook/usePhoto';

export default function CameraService() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const { cameraRef, takePhoto } = usePhoto();

  if (!permission) {
    return <View className="flex-1 bg-brand-prune" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-brand-prune gap-6">
        <View className="w-20 h-20 bg-brand-brown/40 border border-brand-grey/20 rounded-3xl justify-center items-center mb-2">
          <Text className="text-3xl text-brand-pink">📸</Text>
        </View>

        <View className="items-center gap-2 max-w-[280px]">
          <Text className="text-3xl font-light tracking-[4px] text-brand-pink text-center uppercase">
            Caméra
          </Text>
          <Text className="text-sm text-brand-mauve/80 text-center leading-5 font-medium">
            Nous avons besoin de votre autorisation pour utiliser la caméra afin de créer vos cartes de mémoire personnalisées.
          </Text>
        </View>

        <Pressable 
          className="w-full max-w-[260px] h-14 justify-center items-center bg-brand-pink rounded-2xl active:bg-brand-mauve active:scale-95 shadow-lg shadow-brand-pink/20 mt-4 transition-all"
          style={{ elevation: 5 }}
          onPress={requestPermission}
        >
          <Text className="text-brand-prune font-bold text-base tracking-wider uppercase">
            Autoriser
          </Text>
        </Pressable>
      </View>
    );
  }


  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function takePicture() {
    takePhoto();
    console.log('Photo taken!');
  }
  return (
    <View className="flex-1 bg-black relative">
      
      <CameraView 
        ref={cameraRef} 
        style={StyleSheet.absoluteFillObject} 
        facing={facing} 
      />
      
      <View className="pt-12 px-6 bg-transparent" />

      <View className="w-full pb-12 pt-6 px-8 flex-row justify-between items-center bg-[#33131D]/60 border-t border-brand-grey/10 absolute bottom-0 left-0 right-0 z-10">
        
        <TouchableOpacity 
          onPress={toggleCameraFacing}
          className="w-14 h-14 rounded-full bg-brand-brown/70 border border-brand-grey/20 justify-center items-center active:scale-95"
        >
          <Text className="text-brand-mauve text-xs font-semibold text-center tracking-tighter">
           Tourner la caméra
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={takePicture}
          className="w-20 h-20 rounded-full bg-brand-pink justify-center items-center p-1 shadow-xl shadow-brand-pink/40 active:scale-90"
        >
          <View className="w-full h-full rounded-full border-4 border-[#33131D] justify-center items-center bg-transparent" />
        </TouchableOpacity>

        <View className="w-14 h-14 items-center justify-center opacity-0">
          <Text className="text-brand-mauve text-xs">Flash</Text>
        </View>

      </View>
    </View>
  );
}