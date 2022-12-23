import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },

        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,

        likes: {
            type: Map,
            of: Boolean,
        },
            /*likes being stored as an object with a bool value for a userId. 
            If user likes post, they appear in obj with value true. 
            Else they wont appear, saving time complexity when checking for likes. */
        comments: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
)

const Post = mongoose.model("Post", PostSchema);

export default Post;