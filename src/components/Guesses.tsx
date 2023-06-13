import React, {useState, useRef} from 'react';

type GuessesProps = {
    word: string[];
};

const Guesses: React.FC<GuessesProps> = ({word}) => {
    const [guess, setGuess] = useState<string[]>(['', '', '', '', '']);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const handleChange = (index: number, value: string) => {
        const newGuess = [...guess];
        newGuess[index] = value;
        setGuess(newGuess);

        if (index < word.length - 1 && value.length > 0) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyUp = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && index > 0 && guess[index].length === 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter") {
            handleSubmit(event);
        }
    }


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(guess);
        console.log(word);
        // Perform any further processing or actions with the guess

        // Clear the guess after submitting
        setGuess(Array.from({length: word.length}, () => ''));
    };


    return (
        <div>

            <form onSubmit={handleSubmit} onKeyDown={() => handleKeyDown}>
                <div className="flex items-center justify-center space-x-2">
                    {guess.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyUp={(e) => handleKeyUp(index, e)}
                            className="w-16 m-2 h-16 rounded-lg border text-black border-gray-300 text-2xl text-center"
                            maxLength={1}
                            ref={(ref) => {
                                inputRefs.current[index] = ref!;
                            }}
                        />))}
                </div>
                <div
                    className="flex items-center justify-center w-[93%] rounded-xl m-auto sm:w-[600px] h-10 bg-gray-500">
                    <button type="submit">Submit</button>
                </div>
            </form>

        </div>
    );
};

export default Guesses;
