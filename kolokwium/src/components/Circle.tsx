import {Link} from "react-router-dom";

type CircleProps = {
    id : number
}

export function Circle({ id } : CircleProps) {
    return (
        <Link to= {`/shape/${id}`} style={{textDecoration: 'none'}}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'red' }}></div>
        </Link>
    )
}