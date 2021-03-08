import { AuthenticationError } from "apollo-server-express"
import { userOwnership } from "../../utils/tools"
import authorize from "../../utils/isAuth"
import User from "../../models/User"

export default {
    updateProfile: async (parent, args, context, info) => {
        try {
            const req = authorize(context.req)
            if (!userOwnership(req, args.id)) {
                throw new AuthenticationError("Permission denied.")
            } else {
                const user = await User.findById(args.id)
                user.email = args.data.email || user._doc.email
                user.password = args.data.password || user._doc.password
                user.name = args.data.name || user._doc.name
                const newUser = await user.generateToken()
                if (!newUser) {
                    throw new AuthenticationError("An error ocurred, try again.")
                }
                return newUser._doc
            }
        } catch (err) {
            throw new AuthenticationError(err.message)
        }
    }
}