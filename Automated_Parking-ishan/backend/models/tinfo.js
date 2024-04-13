import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    freespace: {
        type: String,
        required: true,
    },
});

export const Review = mongoose.model('parking', reviewSchema);


