const checkCyclic = (graphData, newSourceId, newTargetId) => {    
    const adj = {}
    for (const node of graphData.nodes) {
        adj[node.id] = []
    }
    for (const link of graphData.links) {
        if (adj[link.source] && adj[link.target]) {
            adj[link.source].push(link.target)
        }
    }

    const state = {}
    for (const id in adj) {
        state[id] = 0
    }

    function dfs(currentId) {
        state[currentId] = 1

        if (currentId === newSourceId) {
            return true
        }

        for (const neighborId of adj[currentId]) {
            if (state[neighborId] === 2) {
                continue
            }
            if (dfs(neighborId)) {
                return true
            }
        }

        state[currentId] = 2
        return false
    }

    if (adj[newTargetId]) {
        return dfs(newTargetId)
    }

    return false
}

const validateLink = (graphData, linkData, allowUndefined) => {
    // Validate Link Entries
    if (!linkData.source) {
        return ({
            success: false,
            message: 'Source Node Missing'
        })
    }
    if (!linkData.target) {
        return ({
            success: false,
            message: 'Target Node Missing'
        })
    }

    // Check for circle conflicts
    if (checkCyclic(graphData, linkData.source, linkData.target)) {
        return ({
            success: false,
            message: 'This link would create a cyclic graph'
        })
    }

    // Validate Update Entries
    if (!allowUndefined && !linkData.update.name) {
        return ({
            success: false,
            message: 'Update Description Missing'
        })
    }

    if (!allowUndefined && !linkData.update.value) {
        return ({
            success: false,
            message: 'Update Value Missing or wrong Format'
        })
    }

    // All tests passed
    return { success: true }
}

export default validateLink