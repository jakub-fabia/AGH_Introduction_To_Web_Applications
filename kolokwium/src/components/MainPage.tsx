import {ShapeInterface} from "../App.tsx";
import {Square} from "./Square.tsx";
import {Rectangle} from "./Rectangle.tsx";
import {Circle} from "./Circle.tsx";
import {useEffect, useState} from "react";
import './animation.css'

type MainPageProps = {
    shapes : ShapeInterface[],
    setShapes : (shapes: ShapeInterface[]) => void,
}

export function MainPage({ shapes, setShapes }: MainPageProps) {
    const [selectedType, setSelectedType] = useState<string>('all');
    const [animation, setAnimation] = useState<"shrink" | "grow" | "">("")

    useEffect(() => {
        const timeout1 = setTimeout(() => {
            setAnimation("shrink");
            const timeout2 = setTimeout(() => {
                setAnimation("grow");
            }, 1000);
            return () => clearTimeout(timeout2);
        }, 2000);
        return () => clearTimeout(timeout1)
    }, [])


    const addShape = (shape: Omit<ShapeInterface, 'id'>) => {
        const maxId = shapes.length > 0 ? Math.max(...shapes.map(s => s.id)) : 0;
        const newShape = { ...shape, id: maxId + 1 };
        setShapes([...shapes, newShape]);
    };

    function removeShape(index: number) {
        setShapes(shapes.filter((_, i) => i !== index));
    }

    const filteredShapes = selectedType == 'all' ? shapes : shapes.filter(shape => shape.type === selectedType);

    return (
<div>
    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '20px' }}>
        <select id="shape-select" value={selectedType} onChange={(e) => {
            setSelectedType(e.target.value)
        }}>
            <option value="all">All</option>
            <option value="square">Squares</option>
            <option value="rectangle">Rectangles</option>
            <option value="circle">Circles</option>
        </select>
        <button onClick={() => addShape({ type: 'square'})}>Add Square</button>
        <button onClick={() => addShape({ type: 'rectangle'})}>Add Rectangle</button>
        <button onClick={() => addShape({ type: 'circle'})}>Add Circle</button>
    </div>
    <div className ={`animation ${animation}`} style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '20px' }}>
        {filteredShapes.map((shape, index) => (
            <div key={shape.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                {shape.type === 'square' && <Square id={shape.id}/>}
                {shape.type === 'rectangle' && <Rectangle id={shape.id}/>}
                {shape.type === 'circle' && <Circle id={shape.id}/>}
                <button onClick={() => removeShape(index)}>Remove</button>
            </div>
        ))}
    </div>
</div>
    )
}