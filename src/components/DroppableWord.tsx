import { useDroppable } from "@dnd-kit/core";
import WordCard from "./WordCard";

const DroppableWord: React.FC<{
  word: string;
  activeWord: string | null;
  matched: boolean;
  wrong: boolean;
}> = ({ word, matched, wrong }) => {
  const { setNodeRef } = useDroppable({ id: word });

  return (
    <div ref={setNodeRef}>
      <WordCard word={word} isCorrect={matched} isWrong={wrong} />
    </div>
  );
};
export default DroppableWord;
