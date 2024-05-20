import { Schema, model, models } from "mongoose";

const ownerSchema = new Schema({
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

const ownerModal = models.Owner || model("Owner", ownerSchema);
export default ownerModal;
