import { ApolloError } from "apollo-server-errors"
import authorize from "../../utils/isAuth"
import Category from "../../models/Category"

export default {
    createCategory: async (parent, args, context, info) => {
        try {
            const req = authorize(context.req)
            const category = new Category({
                author: req._id,
                name: args.name
            })
            const result = await category.save()
            if (!result) {
                throw new ApolloError("An error occurred, try again.")
            }
            return result._doc
        } catch (err) {
            throw new ApolloError(err.message)
        }
    }
}