import {useState} from "react";
import {IComment} from "../interfaces/IComment.ts";
import {ICommentResponse} from "../interfaces/ICommentResponse.ts";

const useFetchComments = (post_id: number) => {
    const [comments, setComments] = useState<IComment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchComments = async () =>{
        setLoading(true);
        setError(false);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId: post_id })
        };

        try{
            const response = await fetch("http://localhost:8080/comment/api/get_comments", requestOptions);
            const data: ICommentResponse = await response.json();
            setComments(data.comments);

        }catch(error){
            setError(true);
            console.log(error);

        }finally {
            setLoading(false);
        }
    };

    return { comments, loading, error, setComments, fetchComments };
};

export default useFetchComments;