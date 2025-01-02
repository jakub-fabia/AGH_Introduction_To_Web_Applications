import {useState} from "react";

export function Password() {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    let message = ''
    if (password == '' && repeatPassword == ''){
        message = "Please input your password."
    } else if (password !== repeatPassword){
        message = "The passwords don't match."
    }
    return <div
        style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: "1rem", margin: "2rem auto"}}>
        <label>
            Password:
            <input
                style={{margin: "1rem"}}
                value={password}
                onChange={event => setPassword(event.target.value)}
            />
        </label>
        <label>
            Repeat password:
            <input
                style={{margin: "1rem"}}
                value={repeatPassword}
                onChange={event => setRepeatPassword(event.target.value)}
            />
        </label>
        {message && <div>{message}</div>}
    </div>
}