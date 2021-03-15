import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
// graphql imports
import { ApolloServer } from "apollo-server-express"
import typeDefs from "./graphql/schema"
import QueryRoot from "./graphql/resolvers/query"
import MutationRoot from "./graphql/resolvers/mutation"
import UserResolvers from "./graphql/resolvers/user"
import PostResolvers from "./graphql/resolvers/post"
import CategoryResolvers from "./graphql/resolvers/category"

dotenv.config()
const PORT = process.env.PORT || 8000

const app = express()
const corsOptions = {
    origin: '*',
    credentials: true
}
app.use(cors(corsOptions))

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: QueryRoot.Query,
        Mutation: MutationRoot.Mutation,
        User: UserResolvers.User,
        Post: PostResolvers.Post,
        Category: CategoryResolvers.Category
    },
    context: ({ req }) => {
        req.headers.authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQ0N2FmYjhmMGVjOGFlMDBmYWNmZGQiLCJlbWFpbCI6IjU2NTcwMjk5NEBxcS5jb20iLCJpYXQiOjE2MTUxMDkwMDUsImV4cCI6MTYxNTcxMzgwNX0.ToxTWOFdmqqLoMTV--jlZOp-UeQe1z5-qbS9HGWehwE"
        return { req }
    }
})
apolloServer.applyMiddleware({ app, cors: corsOptions })

app.get("/", (_, res) => {
    res.send("caturday backend, source at https://github.com/enixam/caturday/blob/master/server/server.js")
})
app.listen(PORT, () => {
    console.log(`--- server started on PORT ${PORT} ---`)
})

mongoose.connect(`mongodb+srv://qiushi:${process.env.MONGO_PASSWORD}@cluster0.rzp3d.mongodb.net/graphql-react-course?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log("--- mongodb connected ---")).catch(err => console.log(err))

