import { useState } from 'react';
import { useCamera } from '../context/CameraContext';
import * as Haptics from 'expo-haptics';

type Card = {
  id: string;
  uri: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function useGame() {
  const { gallery } = useCamera();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  function startGame() {
    if (gallery.length < 2) {
      console.warn("Pas assez de photos !");
      return;
    }
    const selected = gallery.slice(0, 6);
    const paired: Card[] = [...selected, ...selected].map((photo, index) => ({
      id: `${index}-${photo.date}`,
      uri: photo.uri,
      isFlipped: false,
      isMatched: false,
    }));

    const shuffled = paired.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

  function flipCard(cardId: string) {
    if (flippedCards.length === 2) return;

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const newCards = cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, { ...card, isFlipped: true }];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      checkMatch(newFlipped, newCards);
    }
  }

  function checkMatch(flipped: Card[], currentCards: Card[]) {
    const [first, second] = flipped;

    if (first.uri === second.uri) {
      const matched = currentCards.map(c =>
        c.uri === first.uri ? { ...c, isMatched: true } : c
      );
      setCards(matched);
      setFlippedCards([]);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      if (matched.every(c => c.isMatched)) {
        setTimeout(() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }, 300);
        setIsWon(true);
      }

    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

      setTimeout(() => {
        setCards(prev =>
          prev.map(c =>
            c.id === first.id || c.id === second.id
              ? { ...c, isFlipped: false }
              : c
          )
        );
        setFlippedCards([]);
      }, 1000);
    }
  }

  return { cards, moves, isWon, startGame, flipCard };
}