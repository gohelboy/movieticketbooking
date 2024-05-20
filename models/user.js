import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    verified: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const userModal = models.Users || model("Users", userSchema);
export default userModal;
