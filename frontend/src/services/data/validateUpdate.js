const validateUpdate = (updateData, allowUndefined) => {
    if (!allowUndefined && !updateData.link_id) {
        return ({
            success: false,
            message: 'No Link Connected'
        })
    }
    if (!updateData.name) {
        return ({
            success: false,
            message: 'Update Description Missing'
        })
    }
    if (!updateData.value) {
        return ({
            success: false,
            message: 'Update Value Missing or wrong Format'
        })
    }

    // All tests passed
    return { success: true }
}

export default validateUpdate