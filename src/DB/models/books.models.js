import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String
    },
    year: {
        type: Number
    },
    genres: {
        type: [String]
    }
});

export const bookModel = mongoose.model("Book", bookSchema);