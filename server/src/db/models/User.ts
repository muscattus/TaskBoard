import mongoose from "mongoose";
import shortid from "shortid";
mongoose.Promise = global.Promise;

const User = mongoose.model(
    "users",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        username: {type: String, required: true},
        password: {type: String, required: true},
        fullname: {type: String, required: false},
        userpic: {type: String, required: false},
    })
);

export {};
export default User;