import User from "../../models/User"
import Category from "../../models/Category"
import { ApolloError } from "apollo-server-errors"

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
    }
}