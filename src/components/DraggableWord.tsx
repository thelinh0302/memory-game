import { useDraggable } from "@dnd-kit/core";
import WordCard from "./WordCard";

const DraggableWord: React.FC<{ word: string }> = ({ word }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: word });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      <WordCard word={word} />
    </div>
  );
};
export default DraggableWord;
