import "../styles.css";
import { Outlet, Link } from "react-router-dom";

export function Layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/add">Add Article</Link></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}
