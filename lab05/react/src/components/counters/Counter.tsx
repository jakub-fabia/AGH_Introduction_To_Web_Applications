import {useState} from "react";

export function Counter() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }

    return (
        <div style={{fontSize: "2rem", margin: "2rem 2rem"}}>
            <button onClick={() => {increment()}}>Dodaj</button>
            <div>{count}</div>
        </div>
    )
}