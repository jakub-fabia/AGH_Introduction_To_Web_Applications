import {useState} from "react";
import {Button} from "./Button";

export function NewCounter() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }

    return (
        <div style={{fontSize: "2rem", margin: "2rem 2rem"}}>
            <Button click={increment} text={"Dodaj"}/>
            <div>{count}</div>
        </div>
    )
}