import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import { 
    Box, 
    Divider, 
    Typography, InputBase, 
    useTheme, 
    Button, 
    IconButton, 
    useMediaQuery } from "@mui/material";

import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

// this is the post widget, which has the post form that submits a post to the api, and also dispatches the updated posts to the redux store
// currently this is inefficient as it fetches all posts from the api, and would slow down as the number of posts increases
const MyPostWidget = ({ picturePath}) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => { //function to handle post request to create new post
        const formData = new FormData(); //create new form data object
        formData.append("userId", _id); //append user id to form data
        formData.append("description", post); //append post description to form data
        if (image) { //if image state is not null, append image to form data
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        } 

        const res = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`},
            body: formData, 
        }) 

        const posts = await res.json(); //get all posts from server, this is inefficient and will be updated in future
        dispatch(setPosts({ posts })); //dispatch action to update posts state
        setImage(null); //reset image state
        setPost(""); //reset post state
    }; 

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase 
                    placeholder="What's on your mind..."
                    onChange= {(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>    
            {isImage && ( 
                <Box 
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem" 
                    >
                        <Dropzone /* Dropzone component from react-dropzone library, if user clicks on image option, dropzone is rendered. User can select image file, updating image state */
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <FlexBetween>
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        width="100%"
                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!image ? (
                                            <p>Add Image</p>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{image.name}</Typography>
                                                <EditOutlined />
                                            </FlexBetween>
                                        )}
                                    </Box>
                                    {image && ( //delete button is rendered if image state is not null
                                        <IconButton 
                                        onClick={() => setImage(null)}
                                        sx={{ width: "15%"}}
                                        >
                                            <DeleteOutlined />
                                        </IconButton>
                                    )}
                                    </FlexBetween>           
                                )}                        
                            </Dropzone>
                    </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween> 
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!image)}> {/* onClick event toggles isImage state, which is used to render dropzone component */}
                    <ImageOutlined sx={{ color: mediumMain}} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": {cursor: "pointer", color: medium} }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobileScreens ? (
                    <> {/* if user is on non mobile screen, more options are rendered, options currently not functioning */}
                        <FlexBetween gap="0.25rem"> 
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>
                                Clip
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>
                                Attachment
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>
                                Audio
                            </Typography>
                        </FlexBetween>
                    </>
                ) : (
                <FlexBetween gap="0.25rem">
                    <MoreHorizOutlined sx={{ color: mediumMain }} />
                </FlexBetween>
                )}
 
                <Button 
                    disabled={!post} //post button is disabled if post state is empty
                    onClick={handlePost} 
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                    > 
                        Post
                    </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default MyPostWidget;