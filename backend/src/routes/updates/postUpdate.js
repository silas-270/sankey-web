import { pool } from '../../services/db/db.js'
import { uploadReceipt } from '../../services/minio/minio.js'

const insertUpdate = async (linkId, name, value, meta, imageFiles) => {
    let finalMeta = {}
    if (meta && typeof meta === 'string') {
        try {
            finalMeta = JSON.parse(meta)
        } catch (error) {
            finalMeta = {}
        }
    } else if (typeof meta === 'object' && meta !== null) {
        finalMeta = meta
    }

    const images = []

    if (imageFiles && imageFiles.length > 0) {
        // use Promises for parallel uploads
        const uploadPromises = imageFiles.map(async file => {
            try {
                const link = await uploadReceipt(file)
                return ({
                    src: link,
                    alt: file.originalname
                })
            } catch (error) {
                console.error(`Failed to upload file ${file.originalname}: ${error.message}`)
                return null
            }
        })

        const results = await Promise.all(uploadPromises)

        // Filter out null results (failed uploads)
        images.push(...results.filter(result => result !== null))
    }

    if (!finalMeta.images) {
        finalMeta.images = []
    }
    finalMeta.images.push(...images)

    const queryText = `
        INSERT INTO updates (link_id, name, value, meta)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `
    const values = [linkId, name, value, JSON.stringify(finalMeta)]

    const result = await pool.query(queryText, values)
    const newUpdate = result.rows[0]

    console.log(`Update inserted with ID: ${newUpdate.update_id}`)
    return newUpdate
}

const postUpdate = async (linkId, name, value, meta, imageFiles) => {
    // Test Input
    if (!linkId || !value || !name) {
        throw new Error('Missing required update data fields')
    }

    // Insert new update
    const newUpdate = await insertUpdate(linkId, name, value, meta, imageFiles)

    return newUpdate
}

export default postUpdate