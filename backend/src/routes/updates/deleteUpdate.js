import { pool } from '../../services/db/db.js'

const deleteUpdate = async (updateId) => {
    // updateId is required for the WHERE clause
    if (!updateId) {
        throw new Error('Missing update Id')
    }

    const queryText = `
        DELETE FROM updates
        WHERE update_id = $1
    `
    const values = [updateId]

    const result = await pool.query(queryText, values)

    // Check if any row was actually deleted
    return result.rowCount > 0
}

export default deleteUpdate