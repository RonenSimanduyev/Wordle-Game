import React, { useEffect } from 'react';

type PopupProps = {
    visible: boolean;
    onClose: () => void;
    message: string;
};

const Popup: React.FC<PopupProps> = ({ visible, onClose, message }) => {
    useEffect(() => {
        if (visible) {
            const timeout = setTimeout(onClose, 3500); // Automatically close after 5 seconds

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [visible, onClose]);

    if (!visible) {
        return null; // Render nothing if the popup is not visible
    }

    return (
        <div className="fixed top-10 left-0 w-full flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-4">
                <p className="text-center text-black">{message}</p>
            </div>
        </div>
    );
};

export default Popup;
