import { pool } from '../../services/db/db.js'
import { uploadReceipt } from '../../services/minio/minio.js'

const insertUpdate = async (linkId, name, value, meta, imageFiles) => {
    if (meta && typeof meta === 'string') {
        try {
            meta = JSON.parse(meta)
        } catch (error) {
            meta = {}
        }
    } else {
        meta = {}
    }

    const images = []

    if (imageFiles && imageFiles.length > 0) {
        // use Promises for parallel uploads
        console.log('Files detected')
        const uploadPromises = imageFiles.map(async file => {
            try {
                const link = await uploadReceipt(file)
                console.log('Generated new Link:', link)
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
        console.log('Results of adding:', result)

        // Filter out null results (failed uploads)
        images.push(...results.filter(result => result !== null))
    }
    console.log('New Images array:', images)
    meta.images = images

    const queryText = `
        INSERT INTO updates (link_id, name, value, meta)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `
    const values = [linkId, name, value, JSON.stringify(meta)]

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

    console.log('received Files:', imageFiles)

    // Insert new update
    const newUpdate = await insertUpdate(linkId, name, value, meta, imageFiles)

    return newUpdate
}

export default postUpdate