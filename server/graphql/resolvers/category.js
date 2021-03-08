import { ApolloError } from "apollo-server-errors"
import Post from "../../models/Post"
import User from "../../models/User"



export default {
    Category: {
        author: async (parent, args, context, info) => {
            try {
                const authorID = parent.author
                const user = await User.findOne({ "_id": authorID })
                return { ...user._doc, password: null }
            } catch (err) {
                throw new ApolloError(err.message)
            }
        },
        post: async (parent, args, context, info) => {
            try {
                const categoryID = parent._id
                const allPosts = await Post.find({})
                return allPosts.filter(post => post.category.includes(categoryID))
            } catch (err) {
                throw new ApolloError(err.message)
            }
        },
    }
}