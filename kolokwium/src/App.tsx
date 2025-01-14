import { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPage} from "./components/MainPage.tsx";
import {ShapeDetails} from "./components/ShapeDetails.tsx";

export interface ShapeInterface {
    id : number,
    type : string
}

function App() {
    const [shapes, setShapes] = useState<ShapeInterface[]>([
        { id: 1, type: 'square' },
        { id: 2, type: 'rectangle' },
        { id: 3, type: 'circle' }
    ])

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage shapes={shapes} setShapes={setShapes}/>} />
            <Route path="/shape/:id" element={<ShapeDetails shapes={shapes} />} />
        </Routes>
    </BrowserRouter>
    )
}

export default App
