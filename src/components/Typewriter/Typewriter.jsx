import React, { useState, useEffect } from 'react';

const Typewriter = ({text, delay=50, startDelay=0, onComplete, className}) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // 1. Handle the initial wait (startDelay)
    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setIsStarted(true);
        }, startDelay);
        return () => clearTimeout(startTimeout);
    }, [startDelay]);

    // 2. Handling the typing logic

    useEffect(() => {
        if (!isStarted || isFinished) return; // Don't start typing until the startDelay is over

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, delay);

            return () => clearTimeout(timeout);
        } else {
            // 3. Mark as finished so the cursor disappears
            setIsFinished(true);
            if (onComplete) onComplete();
        }
    }, [currentIndex, delay, text, isStarted, isFinished, onComplete]);

    // The cursor only shows if the typing started AND is not finished
    const cursorClass = (isStarted && !isFinished) ? 'typing-cursor' : '';

    return <span className={`${className} ${cursorClass}`}>{currentText}</span>;
};

export default Typewriter;