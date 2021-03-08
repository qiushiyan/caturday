import { gql } from "apollo-server-express"

const typeDefs = gql`
    type Query {
        user(id: ID!): User!
        isAuth: User!,
        getAllPosts: [Post!]
        getAllCategories: [Category!]
        getCategoryByID(id: ID!): Category!
    }

    type Mutation {
        signUp(data: AuthInput!): User!
        signIn(data: AuthInput!): User!
        updateProfile(data: profileInput!, id: ID!): User!
        createPost(data: postInput!): Post!
        createCategory(name: String!): Category!
    }

    type User {
        _id: ID!
        email: String!
        password: String!
        name: String!
        token: String!
        post: [Post!]!
        category: [Category!]!
    }

    type Post {
        _id: ID!
        title: String!
        cover: String
        summary: String!
        content: String!
        created_at: String!
        updated_at: String!
        author: User!
        category: [Category!]
        status: PostStatus!
        wikipedia_url: String
    }

    type Category {
        _id: ID!
        name: String! ,
        author: User!
        post: [Post!]
    }

    enum PostStatus {
        PUBLIC
        DRAFT
    }

    input AuthInput {
        email: String!
        password: String!
        name: String
    }

    input profileInput {
        email: String,
        password: String,
        name: String
    }

    input postInput {
        title: String!
        cover: String
        content: String!
        summary: String
        status: PostStatus
        category: [ID!]
        wikipedia_url: String
    }
`
export default typeDefs