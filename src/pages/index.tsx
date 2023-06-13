import {useEffect, useState} from 'react';
import words from '../../data/words.json';
import Guesses from '@/components/Guesses';

export default function Home() {
    const [word, setWord] = useState<string[]>(['', '', '', '', '']);
    const [result, setResult] = useState('');

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

    return (
        <>
            <h1 className="text-5xl text-center mt-[4vh] bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text font-semibold">
                WORDLE
            </h1>
            <Guesses word={word}/>
            <p>{result}</p>
        </>
    );
}
