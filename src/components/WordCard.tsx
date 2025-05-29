import React from "react";
import { motion } from "framer-motion";

interface IWordCard {
    word: string;
    isMatched: boolean;
    isWrong: boolean;
    onClick: VoidFunction;
}

const WordCard = ({ word, isMatched, isWrong, onClick }: IWordCard) => {
    return <motion.div onClick={onClick} initial={false} animate={{
        scale: isMatched ? 1.2 : 1,
        rotate: isWrong ? [0, -10, 10, -10, 10, 0] : 0,
        backgroundColor: isMatched ? '#a6e3a1' : isWrong ? '#f38ba8' : '#f5f5f5'
    }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="p-3 m-3 rounded-[8px] w-[150px] text-center font-bold"
    >
        {word}
    </motion.div>
}
export default WordCard