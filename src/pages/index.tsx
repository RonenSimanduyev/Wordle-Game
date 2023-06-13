import React, {useEffect, useState} from 'react';
import words from '../../data/words.json';
import Guesses from '@/components/Guesses';

export default function Home() {
    const [word, setWord] = useState<string[]>(['', '', '', '', '']);
    const [result, setResult] = useState('');
    const [tries, setTries] = useState<string[][]>([]);

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

    useEffect(() => {
        console.log(word, ':word');
    }, [word]);

    const handleAttempt = (attempt: string[]) => {
        if (tries.length < 6) {
            setTries((prevTries) => [...prevTries, attempt]);
            console.log();
            console.log(tries[tries.length - 1], 'tries');
        }
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
                                className={`w-16 my-2 h-16 leading-[4rem] rounded-lg border text-black bg-white border-gray-300 text-2xl text-center 
                                     ${word[letterIndex] === attempt[letterIndex] ? 'bg-green-500' :
                                    `${word.includes(letter) ? 'bg-yellow-200' : ''}`}`}>
                                {letter}
                             </span>
                        ))}
                    </div>
                ))}
            </div>
            <Guesses word={word} currentRow={tries.length + 1} onAttempt={handleAttempt}/>
            {tries.length === 6 && <p>You have reached the maximum number of attempts.</p>}
            <p>{result}</p>
        </>


    );
}
