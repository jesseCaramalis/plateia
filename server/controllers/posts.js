import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body; //all the front end will send
        const user = await User.findById(userId); //gets user info for user that posted
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {}, 
            comments: [],
        })
        await newPost.save(); //saves post to mongoDB

        const post = await Post.find(); //this returns ALL posts from DB and passing to front end, which will then have a list of all new updated posts.

        res.status(201).json(post);

    } catch (err) {
        res.status(409).json({ message: err.message})
    }
}

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);

    } catch(err){
        res.status(404).json({ message: err.message})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);

    } catch(err){
        res.status(404).json({ message: err.message})
    }
}

// UPDATE
export const likePost = async (req, res) => {
    try {
        const { id } = req.params; //gets id of relevant post
        const { userId } = req.body; //gets userid from body of req
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId)
        //if userId exists in likes, post has been liked. Will delete or otherwise add  userId to likes object with value true
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        
        res.status(200).json(updatedPost); //api responses to front end need to be clear about an updated post.

    } catch(err){
        res.status(404).json({ message: err.message})
    }
}