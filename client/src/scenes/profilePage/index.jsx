import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendsListWidget from "scenes/widgets/FriendsListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

//renders the profile page of the user, which contains the UserWidget, FriendsListWidget, MyPostWidget, and PostsWidget
//this will be expanded to work on other users profiles, displaying their posts and friends without the ability to post.
const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

    const getUser = async () => {
        const res = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json();
        setUser(data);
    }

    useEffect(() => {
        getUser(); // eslint-disable-next-line
    }, []);

    if (!user) return null;

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"} //if the screen is non-mobile, display the widgets in a row, otherwise display them in a column
                gap="2rem"
                justifyContent="center"
                >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <FriendsListWidget userId={userId} />
                </Box>
                <Box 
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                    >
                    <MyPostWidget picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <PostsWidget userId={userId} isProfile /> {/* isProfile is a prop that will be used to determine if the user is on their own profile page */}
                </Box>
            </Box>
        </Box>
    )
}

export default ProfilePage;