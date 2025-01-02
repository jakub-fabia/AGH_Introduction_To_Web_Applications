import {useState} from "react";
import './comment.css';

export interface CommentI {
    id : number,
    body : string,
    postId : number,
    likes : number,
    user: UserI
}

export interface UserI {
    id: number,
    username: string,
    fullName: string
}

export function Comment(prop: CommentI) {

    const [comment, setComment] = useState<CommentI>(prop)

    function handleLike(){
        setComment(prevState => ({
            ...prevState,
            likes: prevState.likes + 1
        }));
    }

    function handleDislike(){
        setComment(prevState => ({
            ...prevState,
            likes: prevState.likes - 1
        }));
    }

    return (
        <div className="comment-container">
            <div className="comment-header">
                <span className="username">{comment.user.fullName}</span>
                <span className="username">@{comment.user.username}</span>
            </div>
            <div className="comment-body">{comment.body}</div>
            <div className="comment-footer">
                <div className="number-wrapper">
                    <span className="likes">Likes: {comment.likes}</span>
                    <span className="likes">PostID: {comment.postId}</span>
                </div>
                <div>
                    <button onClick={handleLike} className="like-button">Like</button>
                    <button onClick={handleDislike} className="dislike-button">Dislike</button>
                </div>
            </div>
        </div>
    );
}

