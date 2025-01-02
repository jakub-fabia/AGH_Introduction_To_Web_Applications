import {useEffect, useState} from "react";
import {Comment, CommentI} from "./Comment";

export function Comments() {
    const [comments, setComments] = useState<CommentI[]>([]);

    useEffect(() => {
        fetch("https://dummyjson.com/comments")
            .then((res) => res.json())
            .then((data) => {
                const commentsData = data.comments.map((comment: any) => ({
                    id: comment.id,
                    body: comment.body,
                    postId: comment.postId,
                    likes: comment.likes,
                    user: {
                        id: comment.user.id,
                        username: comment.user.username,
                        fullName: comment.user.fullName
                    }
                }));
                setComments(commentsData);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
            });
    }, []);
    return (<div>
        {comments.map((comment) => (
            <Comment id={comment.id} body={comment.body} postId={comment.postId} likes={comment.likes} user={comment.user}/>))}
    </div>)
}