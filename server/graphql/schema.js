import { gql } from "apollo-server-express"

const typeDefs = gql`
    type Query {
        user(id: ID!): User!
        isAuth: User!,
        getAllPosts(sortBy: SortByInput, queryBy: [QueryByInput]): [Post!]
        getPostByID(id: ID!): Post
        getAllCategories: [Category!]
        getCategoryByID(id: ID!): Category!

    }

    type Mutation {
        signUp(data: AuthInput!): User!
        signIn(data: AuthInput!): User!
        updateProfile(data: ProfileInput!, id: ID!): User!
        createPost(data: CreatePostInput!): Post!
        updatePost(id: ID!, update: UpdatePostInput): Post!
        deletePost(id: ID!): Boolean
        createCategory(name: String!): Category!
        updateCategory(id: ID!, name: String!): Category!
        deleteCategory(id: ID!): Boolean
    }

    type User {
        _id: ID!
        email: String!
        password: String!
        name: String!
        token: String!
        post(sortBy: SortByInput): [Post]!
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
        category: [Category!]!
        status: PostStatus!
        wikipedia_url: String
        related: [Post]!
    }
    input SortByInput {
        sortBy: String
        order: String
        limit: Int
        skip: Int
    }

    input QueryByInput {
        key: String!
        value: String!
    }

    input UpdatePostInput {
        title: String
        cover: String
        summary: String
        content: String
        category: [ID!]
        status: PostStatus
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

    input ProfileInput {
        email: String,
        password: String,
        name: String
    }

    input CreatePostInput {
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