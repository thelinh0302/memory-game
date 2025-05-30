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
      style={{
        width: '140px',
        minHeight: '48px',
        border: '2px dashed #aaa',
        borderRadius: '8px',
        padding: '6px',
        backgroundColor: isOver ? '#e0f7fa' : '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
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
