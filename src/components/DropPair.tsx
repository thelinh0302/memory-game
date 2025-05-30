import { useDroppable } from "@dnd-kit/core";
import DraggableWordSlot from "./DraggableWordSlot";

const DropSlot = ({
  word,
  id,
  isCorrect,
  isWrong,
  activeWord,
}: {
  word: string | null;
  id: string;
  isCorrect: boolean;
  isWrong: boolean;
  activeWord: string | null;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`lg:w-[300px] sm:w-[160px] min-h-[80px] border-2 border-dashed border-gray-400 rounded-md p-2 flex items-center justify-center transition-colors ${
        isOver ? "bg-cyan-100" : "bg-gray-50"
      }`}
    >
      {word && (
        <DraggableWordSlot
          word={word}
          isCorrect={isCorrect}
          isWrong={isWrong}
          activeWord={activeWord}
        />
      )}
    </div>
  );
};
export default DropSlot
