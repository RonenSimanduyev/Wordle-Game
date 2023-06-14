import React, {useEffect, useState} from 'react';
import words from '../../data/words.json';
import Guesses from '@/components/Guesses';
import Popup from "@/components/Popup";

export default function Home() {
    const [word, setWord] = useState<string[]>(['', '', '', '', '']);
    const [tries, setTries] = useState<string[][]>([]);
    const [message, setMessage] = useState<string>('');
    const [showPopup, setShowPopup] = useState(false);
    const [gameWon, setGameWon] = useState(false); // Track if the game has been won

    useEffect(() => {
        const fetchWord = () => {
            try {
                const randomIndex = Math.floor(Math.random() * words.length);
                const notSplited = words[randomIndex];
                const splited = notSplited.split('');
                setWord(splited);
            } catch (error) {
                console.error('Failed to fetch word:', error);
            }
        };

        fetchWord();
    }, []);

    const handleAttempt = (attempt: string[]) => {
        const isCorrect = attempt.join('') === word.join('');

        if (isCorrect) {
            setTries((prevTries) => [...prevTries, attempt]);
            setMessage(`Congratulations! You guessed the word: ${word.join('')}`);
            setShowPopup(true);
            setGameWon(true); // Set the gameWon state to true
        }

        if (!gameWon && tries.length < 6 && !isCorrect) {
            setTries((prevTries) => [...prevTries, attempt]);
        } else if (!gameWon && tries.length === 6 && !isCorrect) {
            setMessage(`You lost! The word was ${word.join('')}`);
            setShowPopup(true);
        }
    };

    function getBackgroundColor(word: string[], attempt: string[], letterIndex: number): string {
        const letter = attempt[letterIndex];

        if (word[letterIndex] === letter) {
            return '#79b851'; // Green color for correct letter and position
        } else if (word.includes(letter)) {
            const count = word.filter((char) => char === letter).length;
            console.log(count);
            return '#f3c232'; // Yellow color for correct letter but wrong position (first occurrence)
        } else {
            return ''; // No background color
        }
    }
    const handleClosePopup = () => {
        setShowPopup(false);

    };

    return (
        <>
            <h1 className="text-5xl text-center mt-[4vh] bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text font-semibold">
                WORDLE
            </h1>
            <div className="flex flex-col items-center space-y-2">
                {tries.map((attempt: string[], index: number) => (
                    <div key={index} className="flex space-x-2">
                        {attempt.map((letter: string, letterIndex: number) => (
                            <span
                                key={letterIndex}
                                className={`w-16 my-2 h-16 font-semibold leading-[4rem] rounded-lg border text-black bg-white border-gray-300 text-2xl text-center`}
                                style={{backgroundColor: getBackgroundColor(word, attempt, letterIndex)}}
                            >
                                {letter}
                             </span>
                        ))}
                    </div>
                ))}
            </div>
            {!gameWon && ( // Render the Guesses component only if the game is not won
                <Guesses
                    setMessage={setMessage}
                    message={message}
                    word={word}
                    currentRow={tries.length + 1}
                    onAttempt={handleAttempt}
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                />
            )}
            <h1 className="text-center text-3xl">{word}</h1>
            {showPopup && (
                <Popup
                    visible={showPopup}
                    onClose={handleClosePopup}
                    message={message ?? ''} // Use nullish coalescing operator to provide a default value
                />
            )}
        </>


    );
}
