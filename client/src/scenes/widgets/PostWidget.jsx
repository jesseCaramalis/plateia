import { 
    ChatBubbleOutlineOutlined, 
    FavoriteBorderOutlined, 
    FavoriteOutlined, 
    ShareOutlined, } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

// this component is used to display a single page, used in PostsWidget component which renders either all posts or just the posts of a single user
const PostWidget = ({
        postId,
        postUserId,
        name,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments,
}) => {
    const [isComments, setIsComments] = useState(false); // state to toggle comments
    const dispatch = useDispatch(); 
    const token = useSelector((state) => state.token); 
    const loggedInUserId = useSelector((state) => state.user._id); 
    const isLiked = Boolean(likes[loggedInUserId]); // if the current user is in the likes object, then the post is liked, preventing the user from liking the post again
    const likeCount = Object.keys(likes).length; // counts the number of keys in the likes object, which is the number of likes     

    const { palette } = useTheme();
    const primary = palette.primary.main;
    const main = palette.neutral.main;

    const patchLike = async () => { // function to handle patch request to like a post
        const res = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await res.json();
        dispatch(setPost({ post: updatedPost }));
    };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
                <Typography color={main} sx={{ mt: "1rem" }}>
                    {description}
                </Typography>

                {picturePath && ( // if the post has a picture, renders it
                    <img
                        width="100%"
                        height="auto"
                        alt="post"
                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                        src={`http://localhost:3001/assets/${picturePath}`}
                    />
                )}
                <FlexBetween mt="0.25rem"> 
                    <FlexBetween gap="1rem">

                        <FlexBetween gap="0.3rem"> 
                            <IconButton onClick={patchLike}> {/*when the like button is clicked, the patchLike function is called. If post is liked by user then like button changes appearance*/}
                                {isLiked ? (
                                    <FavoriteOutlined sx={{ color: primary }} />
                                ) : (
                                    <FavoriteBorderOutlined />
                                )}
                            </IconButton>
                            <Typography>
                                {likeCount}
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.3rem"> {/*when the comment button is clicked, the comments are toggled*/}
                            <IconButton onClick={() => setIsComments(!isComments)}>
                                <ChatBubbleOutlineOutlined />
                            </IconButton>
                            <Typography> {/*displays the number of comments*/}
                                {comments.length}
                            </Typography>
                        </FlexBetween>
                    </FlexBetween>
                    <IconButton>
                            <ShareOutlined />
                    </IconButton>          
                </FlexBetween>
                {isComments && ( // if comments are toggled, then the comments are rendered
                    <Box mt="0.5rem">
                        {comments.map((comment, i) => (
                            <Box key={`${name}-${i}`}> {/*maps through the comments array and renders each comment*/}
                                <Divider />
                                <Typography sx={{color: main, m: "0.5rem 0", pl: "1rem"}}>
                                    {comment}
                                </Typography>
                            </Box>
                        ))}
                        <Divider />
                    </Box>
                )}
        </WidgetWrapper>
    )
}

export default PostWidget;