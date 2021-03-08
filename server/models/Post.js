import mongoose from "mongoose"

const Schema = mongoose.Schema
const postSchema = mongoose.Schema({
    title: {
        required: true,
        type: String,
        maxlength: 100
    },
    cover: {
        type: String,
    },
    summary: {
        type: String,
        maxlength: 1000
    },
    content: {
        required: true,
        type: String,
        maxlength: 10000
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: [Schema.Types.ObjectId],
        refs: "Category"
    },
    status: {
        type: String,
        enum: ["DRAFT", "PUBLIC"],
        default: "DRAFT"
    },
    wikipedia_url: {
        type: String
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })

const Post = mongoose.model("Post", postSchema)

export default Post