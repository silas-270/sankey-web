import { pool } from '../../services/db/db.js'
import postUpdate from '../updates/postUpdate.js'

const insertLink = async (userId, source, target, firstUpdate) => {
    // Insert the link
    const queryText = `
        INSERT INTO links (user_id, source, target)
        VALUES ($1, $2, $3)
        RETURNING *
    `
    const values = [userId, source, target]

    const result = await pool.query(queryText, values)
    const newLink = result.rows[0]

    // Insert the update
    await postUpdate(newLink.id, firstUpdate.name, firstUpdate.value, firstUpdate.meta)

    console.log(`Link inserted with ID: ${newLink.id}`)
    return newLink
}

const postLink = async (userId, source, target, firstUpdate) => {
    // Test Input
    if (!source || !target) {
        throw new Error('Missing required link data fields')
    }

    if (!firstUpdate.value || !firstUpdate.name) {
        throw new Error('Missing required update field')
    }

    // Insert new Link
    const newLink = await insertLink(userId, source, target, firstUpdate)
    
    return newLink
}

export default postLink