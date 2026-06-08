import { router } from "expo-router";
import { useEffect, useRef, useState, useMemo } from "react";
import { Pressable, Text, View, Animated, Easing, Dimensions, StyleSheet } from "react-native";
import Camera from "./Camera";

const { width, height } = Dimensions.get("window");
const PARTICLE_COUNT = 30;
const PALETTE_VIBRANT_PINK = '#CB7790';
const PALETTE_LIGHT_MAUVE = '#A27A86';

const FallingParticleBackground = () => {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      startX: Math.random() * (width + 100) - 50,
      delay: Math.random() * 15000,
      duration: Math.random() * 6000 + 10000,
      size: Math.random() * 6 + 3,
      shape: ['circle', 'square', 'tri'][Math.floor(Math.random() * 3)],
      color: Math.random() > 0.5 ? PALETTE_VIBRANT_PINK : PALETTE_LIGHT_MAUVE,
    }));
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} className="overflow-hidden">
      {particles.map(particle => (
        <FallingParticle key={particle.id} data={particle} />
      ))}
    </View>
  );
};

const FallingParticle = ({ data }) => {
  const fallAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(fallAnim, {
      toValue: 1,
      duration: data.duration,
      easing: Easing.linear, 
      useNativeDriver: true,
    });

    const timeoutId = setTimeout(() => {
      Animated.loop(animation).start();
    }, data.delay);

    return () => clearTimeout(timeoutId);
  }, [fallAnim, data.duration, data.delay]);

  const translateY = fallAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, height + 50],
  });

  const opacity = fallAnim.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [0, 0.6, 0.3, 0],
  });

  const particleStyle: any = {
    position: 'absolute',
    left: data.startX,
    width: data.size,
    height: data.size,
    backgroundColor: data.shape === 'tri' ? 'transparent' : data.color, 
    borderRadius: data.shape === 'circle' ? data.size / 2 : 1, 
    opacity: opacity,
    transform: [
      { translateY },
      { rotate: fallAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', `${360 + Math.random() * 360}deg`]
        }) 
      }
    ],
  };

  if (data.shape === 'tri') {
    particleStyle.borderLeftWidth = data.size / 2;
    particleStyle.borderRightWidth = data.size / 2;
    particleStyle.borderBottomWidth = data.size;
    particleStyle.borderLeftColor = 'transparent';
    particleStyle.borderRightColor = 'transparent';
    particleStyle.borderBottomColor = data.color;
    particleStyle.width = 0;
    particleStyle.height = 0;
  }

  return <Animated.View style={particleStyle} />;
};

export default function Index() {
  const [clicked, setClicked] = useState(false);

  if (clicked) {
    return (
      <View className="flex-1 bg-brand-prune">
        <Camera />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-brand-prune overflow-hidden px-6 relative">
      <FallingParticleBackground />

      <View className="items-center w-full max-w-[320px] z-10">
    
        <Text className="text-5xl font-extralight tracking-[4px] text-brand-mauve text-center mb-16">
          Pixel<Text className="text-brand-pink font-bold">Mem</Text>
        </Text>

        <View className="w-full gap-4 mb-6">
          
          <Pressable 
            className="w-full h-14 justify-center items-center rounded-2xl border border-brand-grey/40 bg-brand-brown/40 active:bg-brand-brown/70 active:scale-[0.98] transition-all"
            onPress={() => setClicked(true)}
          >
            <Text className="text-brand-mauve text-base font-medium tracking-wide">
              Ouvrir la caméra
            </Text>
          </Pressable>

          <Pressable
            className="w-full h-14 justify-center items-center rounded-2xl border border-brand-grey/40 bg-brand-brown/40 active:bg-brand-brown/70 active:scale-[0.98] transition-all" 
            onPress={() => router.push("/(pages)/GalleryPage")}
          >
            <Text className="text-brand-mauve text-base font-medium tracking-wide">
              Galerie
            </Text>
          </Pressable>

        </View>
        <Pressable
          className="w-full h-14 justify-center items-center rounded-2xl bg-brand-pink border border-brand-prune active:bg-brand-mauve active:scale-[0.96] shadow-lg shadow-brand-pink/30 transition-all"
          style={{ elevation: 8 }}
          onPress={() => router.push("/(pages)/GamePage")}
        >
          <Text className="text-brand-prune text-lg font-bold uppercase tracking-[3px]">
            Jouer
          </Text>
        </Pressable>

      </View>
    </View>
  );
}