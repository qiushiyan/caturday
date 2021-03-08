import User from "../../models/User"
import Category from "../../models/Category"
import Post from "../../models/Post"
import { AuthenticationError } from "apollo-server-express"
import authorize from "../../utils/isAuth"


export default {
    Query: {
        user: async (parent, args, context, info) => {
            try {
                const req = authorize(context.req)
                if (req._id.toString() !== args.id.toString()) {
                    throw new AuthenticationError("Permission denied.")
                }
                const user = await User.findOne({ "_id": args.id })
                return user
            } catch (err) {
                throw new AuthenticationError(err.message)
            }
        },
        isAuth: async (parent, args, context, info) => {
            try {
                const req = authorize(context.req, true)
                if (!req.isAuth) {
                    throw new AuthenticationError("bad token")
                }
                return { _id: req._id, email: req.email, token: req.token }
            } catch (err) {
                throw new AuthenticationError(err.message)
            }
        },
        getAllPosts: async (parent, args, context, info) => {
            try {
                const posts = Post.find({})
                return posts
            } catch (err) {
                throw err
            }
        },
        getAllCategories: async (parent, args, context, info) => {
            try {
                const categories = Category.find({})
                return categories
            } catch (err) {
                throw err
            }
        },
        getCategoryByID: async (parent, args, context, info) => {
            try {
                const category = await Category.findOne({ "_id": args.id })
                return category._doc
            } catch (err) {
                throw err
            }
        }
    }
}