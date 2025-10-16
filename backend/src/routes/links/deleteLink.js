import { pool } from '../../services/db/db.js'

const deleteLink = async (linkId) => {
    // linkId is required for the WHERE clause
    if (!linkId) {
        throw new Error('Missing link Id')
    }

    // Get all update Ids for deleting images
    const updateQuery = `
        SELECT meta FROM updates
        WHERE link_id = $1
    `
    const resultMeta = await pool.query(updateQuery, [linkId])
    const imagesArray = resultMeta.rows.flatMap(row => row.meta.images)

    // Delete all Images in relation to link
    if (imagesArray.length > 0) {
        // Extract the S3 Keys (filenames) from the stored URLs
        const deleteKeys = imagesArray.map(image => {
            const parts = image.src.split('/')
            return parts[parts.length - 1] // The unique filename/S3 Key
        })

        const deletePromises = deleteKeys.map(async key => {
            // Ignore errors for individual file deletion to ensure the DB row can still be removed
            try {
                return await deleteReceipt(key)
            } catch (error) {
                console.error(`Warning: Failed to delete image key ${key} from MinIO. Orphaned file may exist.`, error)
                return null
            }
        })

        await Promise.all(deletePromises)
    }

    // Delete Link entries and on CASCADE the updates
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