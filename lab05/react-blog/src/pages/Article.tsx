import "../styles.css";
import { useParams } from "react-router-dom";

export interface ArticleI {
    id: number;
    title: string;
    content: string;
}

export function Article() {
    const { id } = useParams();
    const articles: ArticleI[] = JSON.parse(localStorage.getItem("articles") || "[]");
    const article = articles.filter((article) => article.id === Number(id))[0] || null;

    if (!article) {
        return <div className="container">Article not found</div>;
    }

    return (
        <div className="container">
            <h1>{article.title}</h1>
            <p>{article.content}</p>
        </div>
    );
}