import React, {useState} from 'react';

type KeyBoardProps = {
    handleGuess: (key: string) => void;
    handleDelete: () => void;
    handleSubmit: () => void;
};
export const KeyBoard = ({handleGuess}: KeyBoardProps) => {
    const keyboard = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

    const handleClick = (key: string) => {
        handleGuess(key);
    };

    return (
        <div>
            {keyboard.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center">
                    {row.split('').map((key, keyIndex) => (
                        <button
                            key={keyIndex}
                            className="w-14 h-14 flex items-center justify-center m-1 bg-white text-black"
                            onClick={() => handleClick(key)}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};
