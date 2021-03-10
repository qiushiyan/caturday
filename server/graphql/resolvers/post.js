import User from "../../models/User"
import Category from "../../models/Category"
import { ApolloError } from "apollo-server-errors"
import Post from "../../models/Post"

export default {
    Post: {
        author: async (parent, args, context, info) => {
            try {
                const userId = parent.author
                const user = await User.findById(userId)
                return { ...user._doc, password: null }
            } catch (err) {
                throw new ApolloError(err.message)
            }
        },
        category: async (parent, args, context, info) => {
            try {
                const categoryIDs = parent.category
                const categories = await Category.find({
                    _id: {
                        $in: categoryIDs
                    }
                })
                return categories
            } catch (err) {
                throw new ApolloError(err.message)
            }
        },
        related: async (parent, args, context, info) => {
            const categoryIDs = parent.category
            const posts = await Post.find({})
            let relatedPosts = [];
            categoryIDs.forEach(id => {
                posts.forEach(post => {
                    if (post.category.includes(id)) {
                        relatedPosts.push(post)
                    }
                })
            })
            return relatedPosts
        }
    }
}