import {useState} from "react";

export function Form() {
    const [text, setText] = useState('');

    return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: "2rem", margin: "2rem auto"}}>
        <input
            value={text}
            onChange={event => setText(event.target.value)}/>
        {text !== '' &&
            <div>Input: {text}</div>
        }
    </div>
}