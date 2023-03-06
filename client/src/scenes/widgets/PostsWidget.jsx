import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
// this component renders a list of posts depending on the props passed to it
// if isProfile is true, it will render the posts of the user whose profile is being viewed
// otherwise it will render all posts using the PostWidget component, which maps over all of the posts in the redux store, and renders a PostWidget for each post

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const getPosts = async () => {
        const res = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => { 
        const res = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json(); 
        dispatch(setPosts({ posts: data })); 
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts()
        } else {
            getPosts();
        }// eslint-disable-next-line
    }, []); // empty array dependency to only run when component mounts

    return (
        <>
        {posts.map(
            ({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
            }) => (
                <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                />
            )
        )}
        </>
    )
};

export default PostsWidget;