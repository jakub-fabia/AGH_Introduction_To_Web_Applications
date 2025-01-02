import {useState} from "react";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    function handleSubmit() {
        if (password !== repeatPassword){
            alert("The passwords don't match.")
            return;
        }
        alert("Login successfully");
    }

    return <div
        style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: "1rem", margin: "2rem auto"}}>
        <label>
            Username:
            <input
                style={{margin: "1rem"}}
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
        </label>
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
        <button
            onClick={handleSubmit}
            disabled={!username || !password || !repeatPassword}>
            Login
        </button>
    </div>
}