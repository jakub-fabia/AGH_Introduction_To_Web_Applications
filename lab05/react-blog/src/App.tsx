import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./pages/Layout";
import {Home} from "./pages/Home";
import {Blog} from "./pages/Blog";
import {Add} from "./pages/Add";
import {Article} from "./pages/Article";
import {NoPage} from "./pages/NoPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />}/>
                    <Route path="blog" element={<Blog />}/>
                    <Route path="add" element={<Add />}/>
                    <Route path="article/:id" element={<Article />}/>
                    <Route path="*" element={<NoPage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App