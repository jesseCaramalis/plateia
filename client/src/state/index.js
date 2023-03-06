import { createSlice } from "@reduxjs/toolkit";

// this file contains a redux toolkit slice, which contains the initial state of the app, and a set of reducers to update the state
const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({ 
    //creates a 'slice' of the reduxe store. A slice is a collection of reducers and actions that are related to a single domain of the app
    //in this case, the authSlice contains all the reducers and actions related to the authentication domain of the app
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => { //toggles app theme between light and dark
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => { //sets user and token state to values passed in action.payload
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => { //sets above state to null
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => { //updates the friends property of the user object in state with action.payload
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent")
            }
        },
        setPosts: (state, action) => { //replaces the posts array in state with action.payload
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => { //
            const updatedPosts = state.posts.map((post) => { //maps over posts array in state, if the post id matches the id of the post in action.payload, replaces with action.payload post
                if (post._id === action.payload.post._id) return action.payload.post; 
                return post; //else returns unchanged posts
            });
            state.posts = updatedPosts; //replaces posts array in state with updatedPosts array
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;