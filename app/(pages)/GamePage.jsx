import { View, Text, Image, Pressable, FlatList } from "react-native";
import { useCamera } from "../../src/context/CameraContext";
import useGame from "../../src/hook/useGame";
import { router } from "expo-router";

export default function GamePage() {
  const { gallery } = useCamera();
  const { cards, moves, isWon, timeLeft, isGameOver, startGame, flipCard } = useGame();

  if (gallery.length < 2) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-brand-prune gap-4">
        <Text className="text-3xl font-light tracking-wide text-brand-pink text-center">
          Pas assez de photos
        </Text>
        <Text className="text-base text-brand-mauve/80 text-center mb-6">
          Prends au moins 2 photos pour jouer !
        </Text>
        <Pressable 
          className="w-full max-w-[260px] h-14 justify-center items-center bg-brand-pink rounded-2xl active:bg-brand-mauve active:scale-95 shadow-lg shadow-brand-pink/20"
          onPress={() => router.push("/(pages)/Camera")}
        >
          <Text className="text-brand-prune text-base font-bold tracking-wider uppercase">
            Prendre des photos
          </Text>
        </Pressable>
      </View>
    );
  }

  if (cards.length === 0) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-brand-prune gap-4">
        <Text className="text-3xl font-light tracking-wide text-brand-pink text-center">
          Jeu de mémoire
        </Text>
        <Text className="text-base text-brand-mauve/80 text-center mb-6">
          {gallery.length} photos disponibles
        </Text>
        <Pressable 
          className="w-full max-w-[260px] h-14 justify-center items-center bg-brand-pink rounded-2xl active:bg-brand-mauve active:scale-95 shadow-lg shadow-brand-pink/20"
          onPress={startGame}
        >
          <Text className="text-brand-prune text-base font-bold tracking-wider uppercase">
            Démarrer le jeu
          </Text>
        </Pressable>
      </View>
    );
  }

  if (isGameOver) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-brand-prune gap-4">
        <Text className="text-4xl font-light tracking-wide text-brand-pink text-center uppercase">
          Temps écoulé !
        </Text>
        <Text className="text-base text-brand-mauve/80 text-center mb-8">
          Tu n'as pas réussi à trouver toutes les paires à temps.
        </Text>
        
        <Pressable 
          className="w-full max-w-[260px] h-14 justify-center items-center bg-brand-pink rounded-2xl active:bg-brand-mauve active:scale-95 shadow-lg shadow-brand-pink/20 mb-2"
          onPress={startGame}
        >
          <Text className="text-brand-prune text-base font-bold tracking-wider uppercase">
            Réessayer
          </Text>
        </Pressable>

        <Pressable 
          className="w-full max-w-[260px] h-14 justify-center items-center bg-transparent border border-brand-grey/50 rounded-2xl active:bg-brand-brown/30 active:scale-95"
          onPress={() => router.push("/")}
        >
          <Text className="text-brand-mauve text-base font-semibold tracking-wider">
            Accueil
          </Text>
        </Pressable>
      </View>
    );
  }

  if (isWon) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-brand-prune gap-4">
        <Text className="text-4xl font-light tracking-wide text-brand-pink text-center">
          Bravo !
        </Text>
        <Text className="text-base text-brand-mauve/80 text-center mb-8">
          Terminé en <Text className="font-bold text-brand-pink">{moves}</Text> coups !
        </Text>
        
        <Pressable 
          className="w-full max-w-[260px] h-14 justify-center items-center bg-brand-pink rounded-2xl active:bg-brand-mauve active:scale-95 shadow-lg shadow-brand-pink/20 mb-2"
          onPress={startGame}
        >
          <Text className="text-brand-prune text-base font-bold tracking-wider uppercase">
            Rejouer
          </Text>
        </Pressable>

        <Pressable 
          className="w-full max-w-[260px] h-14 justify-center items-center bg-transparent border border-brand-grey/50 rounded-2xl active:bg-brand-brown/30 active:scale-95"
          onPress={() => router.push("/")}
        >
          <Text className="text-brand-mauve text-base font-semibold tracking-wider">
            Accueil
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-brand-prune">
      
      <View className="pt-16 pb-4 px-6 flex-row justify-between items-center">
        <Text className="text-xs font-semibold tracking-[2px] text-brand-grey uppercase">
          Coups : <Text className="text-brand-pink font-bold text-sm">{moves}</Text>
        </Text>

        <Text className={`text-xs font-semibold tracking-[2px] uppercase ${timeLeft <= 5 ? "text-brand-pink font-bold" : "text-brand-grey"}`}>
          Temps : <Text className="text-sm font-bold">{timeLeft}s</Text>
        </Text>
      </View>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => (
          <Pressable
            className={`w-[30.3%] aspect-square m-[1.5%] rounded-2xl overflow-hidden bg-brand-brown shadow-sm active:scale-95 transition-all ${
              item.isMatched ? "opacity-40 border-2 border-brand-pink" : ""
            }`}
            onPress={() => flipCard(item.id)}
          >
            {item.isFlipped || item.isMatched ? (
              <Image source={{ uri: item.uri }} className="w-full h-full" resizeMode="cover" />
            ) : (
              <View className="flex-1 bg-brand-brown border border-brand-grey/20 justify-center items-center rounded-2xl">
                <Text className="text-2xl font-light text-brand-mauve/60">?</Text>
              </View>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}