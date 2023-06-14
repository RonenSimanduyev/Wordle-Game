import React, { useState, useRef, useEffect } from 'react';
import words from '../../data/words.json';
import Popup from '@/components/Popup';

interface GuessesProps {
    word: string[];
    currentRow: number;
    onAttempt: (attempt: string[]) => void;
    message?: string; // Make the message prop optional
    setMessage: React.Dispatch<React.SetStateAction<string>>; // Add the setMessage prop
    showPopup:boolean
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
};


const Guesses: React.FC<GuessesProps> = ({ word, currentRow, onAttempt,message,setMessage ,showPopup, setShowPopup}) => {
    const [guess, setGuess] = useState<string[]>(['', '', '', '', '']);
    const [previousAttempts, setPreviousAttempts] = useState<string[][]>([]);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const formRef = useRef<HTMLFormElement>(null);


    useEffect(() => {
        if (formRef.current) {
            formRef.current.reset();
            inputRefs.current[0]?.focus();
        }
    }, [currentRow]);

    const handleChange = (index: number, value: string) => {
        const newGuess = [...guess];
        newGuess[index] = value;
        setGuess(newGuess);

        if (index < word.length - 1 && value.length > 0) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyUp = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Backspace' && index > 0 && guess[index].length === 0) {
            if (guess[index - 1].length > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const guessString = guess.join('');
        if (words.includes(guessString)) {
            onAttempt(guess);
            setPreviousAttempts((prevAttempts) => [...prevAttempts, guess]);
            setGuess(Array.from({ length: word.length }, () => ''));
            if (guessString === word.join('')) {
                setShowPopup(true);
                setMessage('You won!');
            }

            inputRefs.current[0]?.focus();
        } else {
            setShowPopup(true);
            setMessage('This word is not in our data');
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            {currentRow <= 6 && (
                <form onSubmit={handleSubmit} ref={formRef}>
                    <div className="flex items-center justify-center space-x-2">
                        {guess.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyUp={(e) => handleKeyUp(index, e)}
                                className="w-[65px] my-2 h-[65px] rounded-lg border text-black border-gray-300 text-2xl text-center"
                                maxLength={1}
                                ref={(ref) => {
                                    inputRefs.current[index] = ref!;
                                }}
                            />
                        ))}
                    </div>
                    <div className="flex items-center justify-center w-[93%] rounded-xl m-auto sm:w-[600px] h-10 bg-gray-500">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            )}
            {showPopup && (
                <Popup
                    visible={showPopup}
                    onClose={handleClosePopup}
                    message={message ?? ''} // Use nullish coalescing operator to provide a default value
                />
            )}
        </div>
    );
};

export default Guesses;
