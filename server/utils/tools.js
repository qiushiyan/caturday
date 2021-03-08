const userOwnership = (req, value) => {
    if (req._id.toString() !== value.toString()) {
        return false
    } else return true
}

export { userOwnership }