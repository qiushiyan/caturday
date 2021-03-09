const userOwnership = (req, value) => {
    if (req._id.toString() !== value.toString()) {
        return false
    } else return true
}

const sortArgsHelper = (sortByInput) => {
    let sortArgs = {
        sortBy: sortByInput.sortBy || "_id",
        order: sortByInput.order || "asc",
        limit: sortByInput.limit || 10,
        skip: sortByInput.skip || 0
    }
    return sortArgs
}

export { sortArgsHelper, userOwnership }