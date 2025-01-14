import {Link} from "react-router-dom";

type RectangleProps = {
    id : number
}

export function Rectangle({ id } : RectangleProps) {
    return (
        <Link to= {`/shape/${id}`} style={{textDecoration: 'none'}}>
            <div style={{ width: '200px', height: '100px', backgroundColor: 'blue' }}></div>
        </Link>
    )
}