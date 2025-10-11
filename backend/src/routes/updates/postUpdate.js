import { pool } from '../../services/db/db.js'

const insertUpdate = async (linkId, name, value, meta) => {
    const queryText = `
        INSERT INTO updates (link_id, name, value, meta)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `
    const values = [linkId, name, value, meta]

    const result = await pool.query(queryText, values)
    const newUpdate = result.rows[0]

    console.log(`Update inserted with ID: ${newUpdate.update_id}`)
    return newUpdate
}

const postUpdate = async (linkId, name, value, meta) => {
    // Test Input
    if (!linkId || !value || !name) {
        throw new Error('Missing required update data fields')
    }

    // Insert new update
    const newUpdate = await insertUpdate(linkId, name, value, meta)

    return newUpdate
}

export default postUpdate