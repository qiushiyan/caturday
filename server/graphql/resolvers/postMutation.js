import { ApolloError } from "apollo-server-errors"
import Post from "../../models/Post"
import authorize from "../../utils/isAuth"
import { userOwnership } from "../../utils/tools"


export default {
    createPost: async (parent, args, context, info) => {
        try {
            const req = authorize(context.req)
            const post = new Post({
                title: args.data.title,
                cover: args.data.cover || null,
                content: args.data.content,
                summary: args.data.summary || args.data.content.slice(0, 100),
                author: req._id,
                category: args.data.category || [],
                status: args.data.status || "PUBLIC",
                wikipedia_url: args.data.wikipedia_url || null
            })
            const result = await post.save()
            if (!result) {
                throw new ApolloError("An error occurred, try again")
            }
            return result._doc
        } catch (err) {
            throw new ApolloError(err.message)
        }
    },
    updatePost: async (parent, args, context, info) => {
        try {
            const req = authorize(context.req)
            const post = await Post.findOne({ "_id": args.id })
            if (!post) {
                throw new Error("Post does not exist")
            } else if (!userOwnership(req, post.author)) {
                throw new Error("You can only update your own post")
            }
            if (args.update) {
                const update = args.update
                for (let key in update) {
                    if (post[key] != update[key]) {
                        post[key] = update[key]
                    }
                }
            }
            const result = await post.save()
            return result._doc

        } catch (err) {
            throw new ApolloError(err.message)
        }
    },
    deletePost: async (parent, args, context, info) => {
        try {
            const req = authorize(context.req)
            const post = await Post.findOne({ "_id": args.id })
            if (!post) {
                throw new Error("Post does not exist")
            }
            else if (!userOwnership(req, post.author)) {
                throw new Error("You can only delete your own post")
            }
            await post.remove()
            return true
        } catch (err) {
            throw new ApolloError(err.message)
        }
    }
}




