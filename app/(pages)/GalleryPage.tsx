import { router } from "expo-router";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useCamera } from "../../src/context/CameraContext";

export default function GalleryPage() {
  const { gallery } = useCamera();

  function backToHome() {
    router.push("/");
  }
  function goPlay() {
    router.push("/(pages)/GamePage");
  }
  function openCamera() {
    router.push("/(pages)/Camera");
  }

  return (
    <View className="flex-1 bg-brand-prune pt-16">
      <Text className="text-center text-brand-pink text-3xl font-extralight mb-2 tracking-[4px] uppercase">
        Galerie
      </Text>
      
      <Text className="text-center text-brand-mauve/60 text-xs tracking-widest uppercase mb-6">
        {gallery.length} {gallery.length > 1 ? "photos disponibles" : "photo disponible"}
      </Text>
      {gallery.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-brand-mauve text-lg text-center font-light tracking-wide">
            Aucune photo pour l'instant...
          </Text>
          <Text className="text-brand-grey text-sm text-center mt-2 max-w-[200px]">
            Ouvre l'appareil photo pour commencer à créer ton jeu.
          </Text>
        </View>
      ) : (
        <FlatList
          data={gallery}
          keyExtractor={(item) => item.date}
          numColumns={2}
          contentContainerClassName="px-3 pb-8"
          renderItem={({ item }) => (
            <View className="w-1/2 aspect-square p-2">
              <View className="w-full h-full rounded-2xl overflow-hidden border border-brand-grey/20 bg-brand-brown/30 shadow-md">
                <Image
                  source={{ uri: item.uri }}
                  className="w-full h-full"
                  resizeMode="cover"   
                />
              </View>
            </View>
          )}
        />
      )}
      <View className="px-6 pb-10 pt-4 gap-3 bg-brand-prune/90 border-t border-brand-brown/20">
        
        {gallery.length >= 2 && (
          <Pressable 
            className="w-full h-14 justify-center items-center bg-brand-pink rounded-2xl active:bg-brand-mauve active:scale-[0.98] transition-all shadow-lg shadow-brand-pink/25"
            onPress={goPlay}
          >
            <Text className="text-brand-prune font-bold text-base tracking-[2px] uppercase">
              Jouer la partie
            </Text>
          </Pressable>
        )}
        <Pressable 
          className={`w-full h-14 justify-center items-center rounded-2xl active:scale-[0.98] transition-all ${
            gallery.length >= 2 
              ? "bg-transparent border border-brand-grey/40" 
              : "bg-brand-pink shadow-lg shadow-brand-pink/25"
          }`}
          onPress={openCamera}
        >
          <Text className={`font-bold text-base tracking-[2px] uppercase ${
            gallery.length >= 2 ? "text-brand-mauve" : "text-brand-prune"
          }`}>
            {gallery.length >= 2 ? "Prendre une autre photo" : "Ouvrir la caméra"}
          </Text>
        </Pressable>
        <Pressable 
          className="w-full h-14 justify-center items-center bg-brand-brown/30 border border-brand-grey/20 rounded-2xl active:bg-brand-brown/60 active:scale-[0.98] transition-all" 
          onPress={backToHome}
        >
          <Text className="text-brand-mauve text-sm font-medium tracking-wide">
            Retour à l'accueil
          </Text>
        </Pressable>
      </View>
    </View>
  );
}