import jwt, { decode } from 'jsonwebtoken'
import dotenv from "dotenv"
import { AuthenticationError } from "apollo-server-express"
dotenv.config()

const throwAuthError = (message = "not an authorized user") => {
    throw new AuthenticationError(message)
}

const authorize = (req, verify = false) => {
    const authorizationHeader = req.headers.authorization || ""
    if (!authorizationHeader) {
        req.isAuth = false;
        return !verify ? throwAuthError() : req;
    }
    const token = authorizationHeader.replace("Bearer ", "")
    if (!token || token === "") {
        req.isAuth = false
        return !verify ? throwAuthError() : req;
    }
    let decodedJWT
    try {
        decodedJWT = jwt.verify(token, process.env.JWT_KEY)
        if (!decodedJWT) {
            req.isAuth = false
            return !verify ? throwAuthError() : req;
        }
        req.isAuth = true
        req._id = decodedJWT._id
        req.email = decodedJWT.email
        req.token = token
        return req
    } catch (err) {
        req.isAuth = false
        throw new AuthenticationError(err.message)
    }
}

export default authorize