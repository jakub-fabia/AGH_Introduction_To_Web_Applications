import "../styles.css";
import {ChangeEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import { ArticleI } from "./Article";

export function Add() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const articles: ArticleI[] = JSON.parse(localStorage.getItem("articles") || "[]");
        const newArticle: ArticleI = {
            id: articles.length > 0 ? articles[articles.length - 1].id + 1 : 1,
            title,
            content,
        };
        articles.push(newArticle);
        localStorage.setItem("articles", JSON.stringify(articles));
        navigate("/blog");
    };

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        setContent(textarea.value);

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return (
        <div className="container">
            <h1>Add New Article</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button className="button" type="submit">Add</button>
            </form>
        </div>
    );
}