import {Link} from "react-router-dom";

type SquareProps = {
    id : number
}

export function Square({ id } : SquareProps) {
    return (
        <Link to= {`/shape/${id}`} style={{textDecoration: 'none'}}>
            <div style={{ width: '100px', height: '100px', backgroundColor: 'green' }}></div>
        </Link>
    )
}