import "../styles.css";
import {Link} from "react-router-dom";

export function Home() {
    return (
        <div className="container">
            <h1>Welcome to the Blog</h1>
            <Link  to="/blog" className="button">Go to Blog</Link>
        </div>
    );
}