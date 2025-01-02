import {useEffect, useState} from "react";

export function Title() {
    const [title, setTitle] = useState('Sample Title');

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
        </div>
    )
}