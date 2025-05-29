import { useState } from "react";

const HomePage = () => {
    const pairs = {
        forest: "forêt",
        cereal: "céréale",
    };
    const [selectedEng, setSelectedEng] = useState<string | null>(null);
    const [selectedFr, setSelectedFr] = useState<string | null>(null);
    const [matchedWords, setMatchedWords] = useState<string[]>([]);
    const [wrongWords, setWrongWords] = useState<string[]>([]);
    const handleEngClick = (word: string) => setSelectedEng(word);
    const handeClickFr = (word: string) => {
        setSelectedFr(word);
        if (selectedEng) {
            if (pairs[selectedEng as keyof typeof pairs] === word) {
                setMatchedWords((prev) => [...prev, selectedEng, word]);
            } else {
                setWrongWords([...wrongWords, selectedEng]);
            }
        }
        setSelectedEng(null);
        setSelectedFr(null);
    }

    return <>HomePage</>
}
export default HomePage;