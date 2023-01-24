import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        require: true,
        max: 20
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'my city',
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

const userModel = model("User", userSchema)

export default userModel;