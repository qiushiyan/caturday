import Post from "../../models/Post"
import Category from "../../models/Category"
import { ApolloError } from "apollo-server-errors"

export default {
    User: {
        post: async (parent, args, context, info) => {
            try {
                const userId = parent._id
                const posts = await Post.find({ author: userId })
                return posts
            } catch (err) {
                throw new ApolloError(err.message)
            }
        },
        category: async (parent, args, context, info) => {
            try {
                const userId = parent._id
                const categories = await Category.find({ author: userId })
                return categories
            } catch (err) {
                throw new ApolloError(err.message)
            }
        },
    }
}