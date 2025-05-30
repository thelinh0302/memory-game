import DraggableWord from "@components/DraggableWord";
import WordCard from "@components/WordCard";
import { DndContext, DragOverlay, type DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { shuffle } from "@utils/suffle";
import DropSlot from "@components/DropPair";

const HomePage = () => {
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

  const [pool, setPool] = useState<string[]>(allWords);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [dropPairs, setDropPairs] = useState<Array<[string | null, string | null]>>(
    Array.from({ length: Object.keys(pairs).length }, () => [null, null])
  );
  const [graded, setGraded] = useState(false);

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
      const newPairs = prev.map((pair) => [...pair] as [string | null, string | null]);
  
      // Tìm vị trí cũ của từ đang kéo
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
  
      const targetWord = newPairs[index][slot]; // từ ở vị trí đích
  
      if (targetWord && targetWord !== word) {
        // Hoán đổi từ
        if (fromIndex >= 0 && fromSlot >= 0) {
          newPairs[fromIndex][fromSlot] = targetWord;
        }
      } else {
        // Nếu không có gì ở vị trí mới → xóa từ cũ
        if (fromIndex >= 0 && fromSlot >= 0) {
          newPairs[fromIndex][fromSlot] = null;
        }
  
        // Nếu từ kéo từ pool, loại bỏ nó ở pool
        setPool((p) => p.filter((w) => w !== word));
      }
  
      newPairs[index][slot] = word;
  
      return newPairs;
    });
  
    setActiveWord(null);
  };
  

  const handleGrade = () => {
    setGraded(true);
  };
  const checkCorrect = (pair: [string | null, string | null]) => {
    const [a, b] = pair;
    if (!a || !b) return null;
    return pairs[a] === b || pairs[b] === a;
  };

  return (
    <>
      <DndContext
        onDragStart={(e) => setActiveWord(String(e.active.id))}
        onDragEnd={handleDragEnd}
      >
        <div style={{ padding: 32 }}>
          <h2 style={{ textAlign: "center" }}>🧠 Match the Word Pairs</h2>

          <h4>Vocabulary Pool</h4>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {pool.map((word) => (
              <DraggableWord key={word} word={word} />
            ))}
          </div>

          <h4 style={{ marginTop: 24 }}>Your Answers</h4>
          {dropPairs.map((pair, idx) => {
          const result = checkCorrect(pair);
          return (
            <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              {[0, 1].map((slot) => (
                <DropSlot
                    key={slot}
                    id={`slot-${idx}-${slot + 1}`}
                    word={pair[slot]}
                    isCorrect={graded && result === true}
                    isWrong={graded && result === false}
                    activeWord={activeWord}
                />
              ))}
            </div>
          );
        })}

          <div style={{ marginTop: 20 }}>
            <button onClick={handleGrade}>GRADE</button>
          </div>

          <DragOverlay>
            {activeWord ? <WordCard word={activeWord} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </>
  );
};
export default HomePage;
