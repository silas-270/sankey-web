import { pool } from '../../services/db/db.js'
// Assuming your MinIO service exports the deleteReceipt function
import { deleteReceipt } from '../../services/minio/minio.js'

const deleteUpdate = async (updateId) => {
    if (!updateId) {
        throw new Error('Missing update Id')
    }

    const client = await pool.connect() // Use a transaction for safety

    try {
        // 1. FETCH the record to get the image keys before deleting it
        const fetchQuery = `
            SELECT meta FROM updates
            WHERE update_id = $1
        `
        const fetchResult = await client.query(fetchQuery, [updateId])

        const updateRecord = fetchResult.rows[0]

        if (!updateRecord) {
            // The record doesn't exist, nothing to delete
            return false
        }

        const meta = updateRecord.meta || {} // Use the meta object (already JSON parsed by pg)

        // 2. IDENTIFY KEYS FOR DELETION
        const imagesToDelete = meta.images || []

        if (imagesToDelete.length > 0) {
            // Extract the S3 Keys (filenames) from the stored URLs
            const deleteKeys = imagesToDelete.map(image => {
                const parts = image.src.split('/')
                return parts[parts.length - 1] // The unique filename/S3 Key
            })

            // 3. DELETE IMAGES FROM MINIO (CRITICAL: AWAIT)
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

        // 4. DELETE THE RECORD FROM POSTGRESQL
        const deleteQuery = `
            DELETE FROM updates
            WHERE update_id = $1
        `
        const deleteResult = await client.query(deleteQuery, [updateId])

        // Check if any row was actually deleted
        return deleteResult.rowCount > 0

    } catch (error) {
        console.error("Critical error during update deletion:", error)
        throw new Error('Failed to delete update and associated images.')
    } finally {
        client.release()
    }
}

export default deleteUpdate