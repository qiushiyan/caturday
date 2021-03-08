import mongoose from "mongoose"


const Schema = mongoose.Schema

const categorySchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,
        unique: true,
        lowercase: false,
        maxlength: 50
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Category = mongoose.model("Category", categorySchema)

export default Category