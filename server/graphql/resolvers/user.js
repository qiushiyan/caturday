import Post from "../../models/Post"
import Category from "../../models/Category"
import { ApolloError } from "apollo-server-errors"
import { defualtSortArgs, sortArgsHelper } from "../../utils/tools"

export default {
    User: {
        post: async (parent, { sortBy }, context, info) => {
            try {
                const userId = parent._id
                let sortArgs
                if (sortBy) {
                    sortArgs = sortArgsHelper(sortBy)
                } else {
                    sortArgs = defualtSortArgs
                }
                const posts = await Post.find({ author: userId })
                    .sort([[sortArgs.sortBy, sortArgs.order]])
                    .skip(sortArgs.skip)
                    .limit(sortArgs.limit)
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