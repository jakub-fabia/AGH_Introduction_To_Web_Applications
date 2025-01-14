import {ShapeInterface} from "../App.tsx";
import {useParams} from "react-router-dom";
import {Square} from "./Square.tsx";
import {Rectangle} from "./Rectangle.tsx";
import {Circle} from "./Circle.tsx";

type ShapeDetailsProps = {
    shapes : ShapeInterface[],
}

export function ShapeDetails({ shapes }: ShapeDetailsProps) {
    const { id } = useParams<{ id: string }>();
    const shape = shapes.find(s => s.id === Number(id));

    if (!shape) {
        return <p>Shape not found!</p>;
    }

    return (
        <div>
            <h2>Shape Details</h2>
            <p>ID: {shape.id}</p>
            <p>Type: {shape.type}</p>

            {shape.type === 'square' && <Square id={shape.id}/>}
            {shape.type === 'rectangle' && <Rectangle id={shape.id}/>}
            {shape.type === 'circle' && <Circle id={shape.id}/>}
        </div>
    )
}