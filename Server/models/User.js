import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    emailHash:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
<<<<<<< HEAD
    accountType:{
        type:String,
        // enum:["Admin","User"],
        // required:true,
    },
=======
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
    token: {
        type: String,
    },
    documents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Document",
        }
    ],
    
});

const User = mongoose.model('User', userSchema);

export default User;  