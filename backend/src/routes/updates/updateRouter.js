import { Router } from 'express'
import verifySession from '../../services/auth/verifySession.js'
import multer from 'multer'

import postUpdate from './postUpdate.js'
import putUpdate from './putUpdate.js'
import deleteUpdate from './deleteUpdate.js'

const updateRouter = Router({ mergeParams: true })

const storage = multer.memoryStorage()
const upload = multer({ storage: storage }).array('images', 5)

"POST localhost:3000/api/v1/updates?user=test"
updateRouter.post('', upload, async (req, res) => {
    try {
        const userId = req.query.user
        if (!verifySession(userId)) {
            return res.status(400).json({ 'error': 'no valid session found' })
        }

        const { link_id, name, value, meta } = req.body
        const imageFiles = req.files
        const newUpdate = await postUpdate(link_id, name, value, meta, imageFiles)

        return res.status(201).json(newUpdate)
    } catch (err) {
        return res.status(500).json({ 'error': err.message })
    }
})

"PUT  localhost:3000/api/v1/updates?user=test"
updateRouter.put('', upload, async (req, res) => {
    try {
        const userId = req.query.user
        if (!verifySession(userId)) {
            return res.status(400).json({ 'error': 'no valid session found' })
        }
        
        let prevMeta = req.body.prev_meta
        if (prevMeta && typeof prevMeta === 'string') {
            prevMeta = JSON.parse(prevMeta)
        } else {
            prevMeta = null
        }

        let newMeta = req.body.new_meta
        if (newMeta && typeof newMeta === 'string') {
            newMeta = JSON.parse(newMeta)
        } else {
            newMeta = null
        }

        const updateData = {
            updateId: req.body.update_id,
            newName: req.body.name,
            newValue: req.body.value,
            prevMeta,
            newMeta,
            newDate: req.body.created_at
        }

        const imageFiles = req.files

        const updatedUpdate = await putUpdate(updateData, imageFiles)

        return res.status(200).json(updatedUpdate)
    } catch (err) {
        return res.status(500).json({ 'error': err.message })
    }
})

"DELETE localhost:3000/api/v1/updates?user=test"
updateRouter.delete('', async (req, res) => {
    try {
        const userId = req.query.user
        if (!verifySession(userId)) {
            return res.status(400).json({ 'error': 'no valid session found' })
        }

        const { update_id } = req.body
        const success = await deleteUpdate(update_id)

        return res.status(201).json(success)
    } catch (err) {
        return res.status(500).json({ 'error': err.message })
    }
})

export default updateRouter