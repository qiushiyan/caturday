import { AuthenticationError } from "apollo-server-express"
import User from "../../models/User"

export default {
    signIn: async (parent, args, context, info) => {
        const { password, email } = args.data
        try {
            // check email
            const checkEmail = await User.findOne({ email })
            if (!checkEmail) throw new AuthenticationError("The email has not been registered, try sign up instead?")
            // check password
            const user = checkEmail
            const checkPassword = await user.checkPassword(password)
            if (!checkPassword) throw new AuthenticationError("wrong password")
            const tokenResult = await user.generateToken()
            if (!tokenResult) throw new AuthenticationError("An error occurred, please try log in again.")

            return {
                _id: user.id,
                email: user.email,
                token: tokenResult.token
            }
        } catch (err) {
            throw new AuthenticationError(err.message)
        }
    },
    signUp: async (parent, args, context, info) => {
        try {
            let { password, email, name } = args.data
            if (!name) name = email
            const user = new User({
                email,
                password,
                name
            })
            const result = await user.generateToken()
            if (result) {
                return result._doc
            } else {
                throw new AuthenticationError("authentication Error")
            }
        } catch (err) {
            if (err.code === 11000) {
                throw new AuthenticationError("The email has already been registered, try a new one.")
            }
            throw new AuthenticationError(err.message)
        }
    },
}