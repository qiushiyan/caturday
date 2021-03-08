import { ApolloError } from "apollo-server-errors"
import Post from "../../models/Post"
import authorize from "../../utils/isAuth"


export default {
    createPost: async (parent, args, context, info) => {
        try {
            const req = authorize(context.req)
            const post = new Post({
                title: args.data.title,
                cover: args.data.cover || null,
                content: args.data.content,
                summary: args.data.summary || args.data.content.slice(0, 200),
                author: req._id,
                category: args.data.category || [],
                status: args.data.status || "PUBLIC",
                wikipedia_url: args.data.wikipedia_url || null
            })
            const result = await post.save()
            if (!result) {
                throw new ApolloError("An error occurred, try again.")
            }
            return result._doc
        } catch (err) {
            throw new ApolloError(err.message)
        }
    }
}




