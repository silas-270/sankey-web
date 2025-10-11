export const validateLinkEntries = (
    sourceId,
    targetId,
    linkValue,
    printError
) => {
    let testResults = [true, true, true] // Default all to valid
    let errors = 0

    // Trim inputs to avoid issues with extra spaces
    sourceId = sourceId.trim()
    targetId = targetId.trim()
    linkValue = linkValue.trim()

    // Normalize link value (replace commas with periods)
    let normalizedLinkValue = linkValue.replace(',', '.')
    const regex = /^[0-9]+(\.[0-9]+)?$/ // Validates integer or decimal numbers

    if (!sourceId) {
        testResults[0] = false
        if (printError) {
            console.warn('Missing Source Id')
        }
        errors += 1
    }
    if (!targetId) {
        testResults[1] = false
        if (printError) {
            console.warn('Missing Target Id')
        }
        errors += 1
    }
    if (!regex.test(normalizedLinkValue)) {
        testResults[2] = false
        if (printError) {
            console.warn('Invalid Value')
        }
        errors += 1
    }

    // If there are no errors, return null (valid case)
    if (errors == 0) {
        return null
    } else {
        // Return test results with invalid fields marked as false
        return testResults
    }
}

export const validateLinkArray = (data) => {
    if (!Array.isArray(data)) {
        return false
    }

    return data.every(item => {
        const { source, target, value } = item;
        const result = validateLinkEntries(source, target, String(value));

        if (result) {
            return false
        }
        return true
    });
};
