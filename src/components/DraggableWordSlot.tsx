import { useDraggable } from "@dnd-kit/core";
import WordCard from "./WordCard";

const DraggableWordSlot = ({
  word,
  isCorrect,
  isWrong,
  activeWord,
}: {
  word: string;
  isCorrect: boolean;
  isWrong: boolean;
  activeWord: string | null;
}) => {
  const { setNodeRef, listeners, attributes } = useDraggable({ id: word });
  if (word === activeWord) return null;
  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <WordCard word={word} isCorrect={isCorrect} isWrong={isWrong} />
    </div>
  );
};
export default DraggableWordSlot
