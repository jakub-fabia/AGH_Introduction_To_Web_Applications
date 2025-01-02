import {useState} from "react";

export function Ternary() {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return (<div>
        {a
            ? <div>a is true.</div>
            : <div>a is false.</div>
        }
        {b
            ? <div>b is true.</div>
            : <div>b is false.</div>
        }
    </div>)
}