import type { DragEndEvent } from "@dnd-kit/core";
import { shuffle } from "@utils/suffle";
import { useState } from "react";

const pairs: Record<string, string> = {
  forest: "forêt",
  sibling: "frère et sœur",
  cereal: "céréale",
  desk: "bureau",
  camel: "chameau",
  butter: "beurre",
  bicycle: "vélo",
  railroad: "chemin de fer",
  folder: "dossier",
  weekly: "hebdomadaire",
  hungry: "faim",
  limestone: "calcaire",
};
const allWords = shuffle([...Object.keys(pairs), ...Object.values(pairs)]);

export const useDragDropVocabulary = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [pool, setPool] = useState<string[]>(allWords);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [dropPairs, setDropPairs] = useState<
    Array<[string | null, string | null]>
  >(Array.from({ length: Object.keys(pairs).length }, () => [null, null]));
  const [graded, setGraded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const checkCorrect = (pair: [string | null, string | null]) => {
    const [a, b] = pair;
    if (!a || !b) return null;
    return pairs[a] === b || pairs[b] === a;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;

    const word = String(active.id);
    const overId = over.id.toString();
    const match = overId.match(/^slot-(\d+)-(\d+)$/);
    if (!match) return;

    const index = Number(match[1]);
    const slot = Number(match[2]) - 1;

    setDropPairs((prev) => {
      const newPairs = prev.map(
        (pair) => [...pair] as [string | null, string | null]
      );
      // find old position of the word
      let fromIndex = -1;
      let fromSlot = -1;
      for (let i = 0; i < newPairs.length; i++) {
        for (let j = 0; j < 2; j++) {
          if (newPairs[i][j] === word) {
            fromIndex = i;
            fromSlot = j;
          }
        }
      }

      const targetWord = newPairs[index][slot]; // word at the target position

      if (targetWord && targetWord !== word) {
        // swap word
        if (fromIndex >= 0 && fromSlot >= 0) {
          newPairs[fromIndex][fromSlot] = targetWord;
        }
      } else {
        // if there is nothing at the new position → delete the old word
        if (fromIndex >= 0 && fromSlot >= 0) {
          newPairs[fromIndex][fromSlot] = null;
        }

        // if the word is dragged from the pool, remove it from the pool
        setPool((p) => p.filter((w) => w !== word));
      }

      newPairs[index][slot] = word;

      return newPairs;
    });

    setActiveWord(null);
  };

  const handleToggle = () => {
    if (isStarted) {
      // Reset all states
      setPool(shuffle([...Object.keys(pairs), ...Object.values(pairs)]));
      setDropPairs(
        Array.from({ length: Object.keys(pairs).length }, () => [null, null])
      );
      setGraded(false);
      setIsStarted(false);
    } else {
      setGraded(true);
      setIsStarted(true);
    }
  };

  const handleStart = () => {
    setShowOnboarding(false);
    setPool(shuffle([...Object.keys(pairs), ...Object.values(pairs)]));
    setDropPairs(
      Array.from({ length: Object.keys(pairs).length }, () => [null, null])
    );
    setGraded(false);
    setIsStarted(false);
  };

  const correctCount = dropPairs.reduce((acc, pair) => {
    return acc + (checkCorrect(pair) ? 1 : 0);
  }, 0);

  return {
    showOnboarding,
    pool,
    activeWord,
    dropPairs,
    graded,
    handleToggle,
    handleDragEnd,
    setActiveWord,
    checkCorrect,
    handleStart,
    correctCount,
  };
};
