import DraggableWord from "@components/DraggableWord";
import WordCard from "@components/WordCard";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import DropSlot from "@components/DropPair";
import { Onboarding } from "@components/Onboarding";
import { AnimatePresence, motion } from "framer-motion";
import { useDragDropVocabulary } from "@hooks/useDragDropVocabulary";

const HomePage = () => {
  const {
    showOnboarding,
    handleStart,
    pool,
    activeWord,
    dropPairs,
    graded,
    handleToggle,
    handleDragEnd,
    setActiveWord,
    checkCorrect,
  } = useDragDropVocabulary();

  if (showOnboarding) {
    return (
      <AnimatePresence>
        <Onboarding setShowOnboarding={handleStart} />
      </AnimatePresence>
    );
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <DndContext
          onDragStart={(e) => setActiveWord(String(e.active.id))}
          onDragEnd={handleDragEnd}
        >
          <div className="p-[5rem] m-auto w-screen">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse text-transparent bg-clip-text">
              Match the Word Pairs
            </h2>

            <h4 className="text-3xl mt-5 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-transparent bg-clip-text">
              Vocabulary
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {pool.map((word: string) => (
                <DraggableWord key={word} word={word} />
              ))}
            </div>

            <h4 className="text-3xl mt-5 mb-5 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-transparent bg-clip-text">
              Vocabulary Pool
            </h4>
            <div className="flex justify-center items-start">
              <div className="grid lg:grid-cols-2 gap-8 sm:grid-cols-1">
                <div>
                  <div className="flex justify-between font-semibold text-gray-700 text-lg mb-2 pl-2">
                    <div className="w-36 text-center">🇬🇧 English</div>
                    <div className="w-36 text-center">🇫🇷 French</div>
                  </div>
                  {dropPairs
                    .slice(0, Math.ceil(dropPairs.length / 2))
                    .map((pair, idx) => {
                      const result = checkCorrect(pair);
                      return (
                        <div key={idx} className="flex gap-1 mb-2 px-2">
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
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-gray-700 text-lg mb-2 pl-2">
                    <div className="w-36 text-center">🇬🇧 English</div>
                    <div className="w-36 text-center">🇫🇷 French</div>
                  </div>
                  {dropPairs
                    .slice(Math.ceil(dropPairs.length / 2))
                    .map((pair, idx) => {
                      const realIdx = idx + Math.ceil(dropPairs.length / 2);
                      const result = checkCorrect(pair);
                      return (
                        <div key={realIdx} className="flex gap-1 mb-2 px-2">
                          {[0, 1].map((slot) => (
                            <DropSlot
                              key={slot}
                              id={`slot-${realIdx}-${slot + 1}`}
                              word={pair[slot]}
                              isCorrect={graded && result === true}
                              isWrong={graded && result === false}
                              activeWord={activeWord}
                            />
                          ))}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleToggle}
              >
                {graded ? "GO" : "GRADE"}
              </button>
            </div>
            <DragOverlay>
              {activeWord ? <WordCard word={activeWord} /> : null}
            </DragOverlay>
          </div>
        </DndContext>
      </motion.div>
    </>
  );
};
export default HomePage;
