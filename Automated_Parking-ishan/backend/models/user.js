import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            default: null
        }

    }
)
export const User = mongoose.model('KnowUser', userSchema);
