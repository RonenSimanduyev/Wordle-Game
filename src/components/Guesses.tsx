import React, {useState} from 'react';
import {KeyBoard} from './KeyBoard';

type GuessesProps = {
    word: string;
};

const Guesses: React.FC<GuessesProps> = ({word}) => {
    const [guess, setGuess] = useState<string[]>(['', '', '', '', '']);

    const handleGuess = (key: string) => {
        const newGuess = [...guess];
        const index = newGuess.findIndex((value) => value === '');
        if (index !== -1) {
            newGuess[index] = key;
            setGuess(newGuess);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center space-x-2">
                {guess.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        value={value}
                        className="w-16 m-2 h-16 rounded-lg border text-black border-gray-300 text-2xl text-center"
                        maxLength={1}
                        readOnly
                    />
                ))}
            </div>
            <KeyBoard handleGuess={handleGuess}/>
        </div>
    );
};

export default Guesses;
