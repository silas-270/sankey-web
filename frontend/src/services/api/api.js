const API_URL = import.meta.env.VITE_API_URL

export const fetchGetLinks = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/links?user=${userId}`)
        return await response.json()
    } catch (err) {
        console.error('Error while fetching', err.message)
    }
}

export const fetchAddLink = async ({ source, target, update, userId }) => {
    if (!source || !target || !update.value) {
        console.error('Missing input fields')
        return
    }
    try {
        const response = await fetch(`${API_URL}/links?user=${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source, target, update })
        })
        return await response.json()
    } catch (err) {
        console.error('Error while fetching', err.message)
    }
}

export const fetchPutLink = async ({ link_id, source, target, created_at, userId }) => {
    if (!link_id) {
        console.error('Missing input fields')
        return
    }
    try {
        const response = await fetch(`${API_URL}/links?user=${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ link_id, source, target, created_at })
        })
        return await response.json()
    } catch (err) {
        console.error('Error while fetching', err.message)
    }
}

export const fetchDelLink = async ({ link_id, userId }) => {
    if (!link_id) {
        console.error('Missing input fields')
        return
    }
    try {
        const response = await fetch(`${API_URL}/links?user=${userId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ link_id })
        })
        return await response.json()
    } catch (err) {
        console.error('Error while fetching', err.message)
    }
}

export const fetchAddUpdate = async ({ formData, userId }) => {
    try {
        const response = await fetch(`${API_URL}/updates?user=${userId}`, {
            method: 'POST',
            body: formData
        })
        return await response.json()
    } catch (err) {
        console.error('Error while fetching', err.message)
    }
}

export const fetchPutUpdate = async ({ update_id, name, value, meta, created_at, userId }) => {
    if (!update_id) {
        console.error('Missing input fields')
        return
    }
    try {
        const response = await fetch(`${API_URL}/updates?user=${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ update_id, name, value, meta, created_at })
        })
        return await response.json()
    } catch (err) {
        console.error('Error while fetching', err.message)
    }
}

export const fetchDelUpdate = async ({ update_id, userId }) => {
    if (!update_id) {
        console.error('Missing input fields')
        return
    }
    try {
        const response = await fetch(`${API_URL}/updates?user=${userId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ update_id })
        })
        return await response.json()
    } catch (err) {
        console.error('Error while fetching', err.message)
    }
}