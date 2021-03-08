import authMutation from "./authMutation"
import userMutation from "./userMutation"
import postMutation from "./postMutation"
import categoryMutation from "./categoryMutation"

export default {
    Mutation: {
        signUp: authMutation.signUp,
        signIn: authMutation.signIn,
        updateProfile: userMutation.updateProfile,
        createPost: postMutation.createPost,
        createCategory: categoryMutation.createCategory
    }
}