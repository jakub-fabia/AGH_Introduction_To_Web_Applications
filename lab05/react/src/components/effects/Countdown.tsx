import {useEffect, useState} from "react";

export function Countdown() {
    const [counter, setCounter] = useState(Number(15));
    const [isRunning, setIsRunning] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    useEffect(() => {
        if(isRunning && counter >= 0.001) {
            const interval = setInterval(() => {
                setCounter(counter - 0.001)
            }, 1)
            return () => clearInterval(interval);
        }
        if(counter <= 0.001){
            setHasFinished(true);
        }
    }, [counter, isRunning]);

    function toggleIsRunning() {
        setIsRunning(!isRunning);
    }

    return (
        <div>
            <button
                    disabled={hasFinished}
                    onClick={() => toggleIsRunning()}>
                {isRunning
                    ? "STOP"
                    : "START"}
            </button>
            <div>
                {!hasFinished
                ? counter.toFixed(1)
                : "Countdown complete!"}
            </div>
        </div>
    )
}