import {useState} from "react";
import {IPost} from "../interfaces/IPost.ts";
import {IPostResponse} from "../interfaces/IPostResponse.ts";
import {ActivityFilterType} from "../enum/ActivityFilterType.ts";
import {DatetimeFilterType} from "../enum/DatetimeFilterType.ts";


const useFetchPosts = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchPosts = async (activityFilterType : ActivityFilterType, datetimeFilterType: DatetimeFilterType, latitude: number | undefined, longitude: number | undefined) => {
        setLoading(true);
        setError(false);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'
            },
            body: JSON.stringify({coordinates: {longitude: longitude, latitude: latitude}, activityFilterType: activityFilterType, datetimeFilterType: datetimeFilterType })
        };

        try {
            const response = await fetch("http://localhost:8080/post/api/get_nearby_posts", requestOptions);
            const data: IPostResponse = await response.json();
            setPosts(data.posts);

        } catch (error) {
            setError(true);
            console.log(error);

        } finally {
            setLoading(false);
        }
    }

    return { posts, loading, error, fetchPosts };
};

export default useFetchPosts;