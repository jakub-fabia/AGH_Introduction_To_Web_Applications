
type ButtonProps = {
    click : () => void
    text: string
}

export function Button({click, text}: ButtonProps){
    return (<button onClick={click}>{text}</button>)
}