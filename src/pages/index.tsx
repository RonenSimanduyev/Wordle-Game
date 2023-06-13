import {useEffect, useState, ChangeEvent} from 'react';
import words from '../../data/words.json';
import Guesses from "@/components/Guesses"; // Update the import path

export default function Home() {
    const [word, setWord] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        // Load a random word from words.json when the component mounts
        const fetchWord = () => {
            try {
                const randomIndex = Math.floor(Math.random() * words.length);
                setWord(words[randomIndex]);
            } catch (error) {
                console.error('Failed to fetch word:', error);
            }
        };
        fetchWord();
    }, []);


    return (
        <>
            <h1 className="text-5xl text-center mt-[4vh] bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text font-semibold">WORDLE</h1>
            {/*<p>Guess the 5-letter word:</p>*/}
            {/*<p>{word}</p>*/}
            <Guesses word={word}/>
            <p>{result}</p>
        </>
    );
}
