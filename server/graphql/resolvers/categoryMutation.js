import { ApolloError } from "apollo-server-errors"
import authorize from "../../utils/isAuth"
import Category from "../../models/Category"
import { userOwnership } from "../../utils/tools"

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
                throw new ApolloError("An error occurred, try again")
            }
            return result._doc
        } catch (err) {
            throw new ApolloError(err.message)
        }
    },
    updateCategory: async (parent, args, context, info) => {
        try {
            const req = authorize(context.req)
            const category = await Category.findOne({ "_id": args.id })
            if (!category) {
                throw new Error("category does not exist")
            } else if (!userOwnership(req, category.author)) {
                throw new Error("You can only delete categories you created")
            }
            category.name = args.name
            const result = await category.save()
            if (!result) {
                throw new ApolloError("An error occurred, try again")
            }
            return result._doc
        } catch (err) {
            throw new ApolloError(err.message)
        }
    },
    deleteCategory: async (parent, args, context, info) => {
        try {
            const req = authorize(context.req)
            const category = await Category.findOne({ "_id": args.id })
            if (!category) {
                throw new Error("Category does not exist")
            }
            else if (!userOwnership(req, category.author)) {
                throw new Error("You can only delete category you created")
            }
            await category.remove()
            return true
        } catch (err) {
            throw new ApolloError(err.message)
        }
    }
}