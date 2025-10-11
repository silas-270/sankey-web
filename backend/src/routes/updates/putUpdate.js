import { pool } from '../../services/db/db.js'

const updateUpdate = async (updateData) => {
    // Destructure the required identifier and potential update fields
    const { updateId, newName, newValue, newMeta, newDate } = updateData

    // 1. Collect the fields to update and their values
    const updates = {}
    if (newValue != undefined) {
        updates.value = newValue
    }
    if (newName != undefined) {
        updates.name = newName
    }
    if (newMeta != undefined) {
        updates.meta = newMeta
    }
    if (newDate != undefined) {
        updates.created_at = newDate
    }

    const fieldsToUpdate = Object.keys(updates)

    if (fieldsToUpdate.length === 0) {
        return null
    }

    // 2. Build the dynamic SET clause and values array
    const setClauses = []
    const values = [updateId] // Start with updateId as the first parameter ($1)
    let paramIndex = 2 // Start parameter indexing for fields at $2

    fieldsToUpdate.forEach(field => {
        setClauses.push(`${field} = $${paramIndex}`)
        values.push(updates[field])
        paramIndex++
    })

    const setClause = setClauses.join(', ')

    // 3. Construct the final query
    const queryText = `
        UPDATE updates
        SET ${setClause}
        WHERE update_id = $1
        RETURNING *
    `

    // 4. Execute the query
    const result = await pool.query(queryText, values)
    const newUpdate = result.rows[0]

    return newUpdate
}

const putUpdate = async (updateData) => {
    // Destructure properties from the single updateData object
    const { updateId, newDate } = updateData

    // updateId is required for the WHERE clause
    if (!updateId) {
        throw new Error('Missing update Id')
    }

    // Only validate newDate if it is actually provided (not undefined)
    if (newDate !== undefined) {
        const isoDateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{1,})?Z$/
        if (typeof newDate !== 'string' || !isoDateRegex.test(newDate)) {
            throw new Error('Invalid date format. Date must be a string in "YYYY-MM-DDTHH:mm:ss.sssZ" format.')
        }
    }

    // Pass the entire data object to the lower-level function
    const newUpdate = await updateUpdate(updateData)

    return newUpdate
}

export default putUpdate