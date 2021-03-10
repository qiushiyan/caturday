const userOwnership = (req, value) => {
    if (req._id.toString() !== value.toString()) {
        return false
    } else return true
}

const sortArgsHelper = (sortByInput) => {
    let sortArgs = {
        sortBy: sortByInput.sortBy || "createt_at",
        order: sortByInput.order || "desc",
        limit: sortByInput.limit || 10,
        skip: sortByInput.skip || 0
    }
    return sortArgs
}

const defualtSortArgs = {
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    skip: 0
}

const queryArgsHelper = (queryByInput) => {
    let queryArgs = {}
    if (queryByInput) { // an array of objects
        queryByInput.forEach(item => {
            queryArgs[item.key] = item.value
        })
    }
    return queryArgs
}


export { sortArgsHelper, queryArgsHelper, defualtSortArgs, userOwnership }