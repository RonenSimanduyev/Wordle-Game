import React, {useState, useRef, useEffect} from 'react';

type GuessesProps = {
    word: string[];
    currentRow: number;
    onAttempt: (attempt: string[]) => void;
};

const Guesses: React.FC<GuessesProps> = ({word, currentRow, onAttempt}) => {
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
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (guess.some((input) => input === '')) {
            return <h1>You need to fill all the inputs.</h1>;
        }

        // console.log('guess:', guess.length, guess);
        onAttempt(guess);
        setPreviousAttempts((prevAttempts) => [...prevAttempts, guess]);
        setGuess(Array.from({length: word.length}, () => ''));

        inputRefs.current[0]?.focus();
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
                    <div
                        className="flex items-center justify-center w-[93%] rounded-xl m-auto sm:w-[600px] h-10 bg-gray-500">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            )}
            {word}
        </div>
    );
};

export default Guesses;
