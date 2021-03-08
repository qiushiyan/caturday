import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "invalid email format"]
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
    },
    name: {
        type: String,
        maxLength: 20,
    },
    token: {
        type: String
    }
})

userSchema.pre("save", function (next) {
    const user = this
    if (user.isModified("password")) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY, {
        expiresIn: "7d"
    })
    user.token = token
    return user.save()
}
userSchema.methods.checkPassword = async function (candidatePassword) {
    const user = this
    const result = await bcrypt.compare(candidatePassword, user.password)
    return result
}

const User = mongoose.model("User", userSchema)
export default User