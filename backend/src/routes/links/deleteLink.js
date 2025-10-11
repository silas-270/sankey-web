import { pool } from '../../services/db/db.js'

const deleteLink = async (linkId) => {
    // linkId is required for the WHERE clause
    if (!linkId) {
        throw new Error('Missing link Id')
    }

    const queryText = `
        DELETE FROM links
        WHERE id = $1
    `
    const values = [linkId]

    const result = await pool.query(queryText, values)

    // Check if any row was actually deleted
    return result.rowCount > 0
}

export default deleteLink