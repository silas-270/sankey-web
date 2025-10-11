const verifySession = async (userId) => {
    if (userId) {
        return true
    }
    return false
}

export default verifySession