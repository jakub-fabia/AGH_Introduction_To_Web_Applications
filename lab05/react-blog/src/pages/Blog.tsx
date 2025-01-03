import "../styles.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArticleI } from "./Article";

export function Blog() {
    const [articles, setArticles] = useState<ArticleI[]>([]);

    useEffect(() => {
        const storedArticles: ArticleI[] = JSON.parse(localStorage.getItem("articles") || "[]");
        setArticles(storedArticles);
    }, []);

    return (
        <div className="container">
            <h1>Blog Articles</h1>
            <ul className="article-list">
                {articles.map((article) => (
                    <li key={article.id}>
                        <Link to={`/article/${article.id}`}>{article.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}