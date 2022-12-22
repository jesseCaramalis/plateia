import User from "../models/User";

// READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
    
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id)) //making multiple API calls with map and findById, need promise all.
        );
        const formattedFriends = friends.map( //data needs to be formatted for the frontend
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }; //formats specific data as an object, ready to be sent as a json
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}