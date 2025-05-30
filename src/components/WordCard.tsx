import React from "react";
import { motion } from "framer-motion";

const WordCard: React.FC<{
    word: string;
    isCorrect?: boolean;
    isWrong?: boolean;
    style?: React.CSSProperties;
  }> = ({ word, isCorrect, isWrong }) => {
    return (
        <motion.div
          layout
          animate={{
            backgroundColor: isCorrect
              ? '#a6e3a1'
              : isWrong
              ? '#f38ba8'
              : '#fff',
            rotate: isWrong ? [0, 0, -10, 10, 0] : 0,
            scale: isCorrect ? 1.05 : 1,
          }}
          transition={{ type: 'keyframes', stiffness: 300, damping: 20 }}
          style={{
            padding: '10px 16px',
            margin: '6px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            cursor: 'grab',
            fontWeight: 'bold',
            textAlign: 'center',
            background: '#fff',
          }}
        >
          {word}
        </motion.div>
      );
  };
export default WordCard
