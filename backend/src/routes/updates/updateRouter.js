import { Router } from 'express'
import verifySession from '../../services/auth/verifySession.js'

import postUpdate from './postUpdate.js'
import putUpdate from './putUpdate.js'
import deleteUpdate from './deleteUpdate.js'

const updateRouter = Router({ mergeParams: true })

"POST localhost:3000/api/v1/updates?user=test"
updateRouter.post('', async (req, res) => {
    try {
        const userId = req.query.user
        if(!verifySession(userId)) {
            return res.status(400).json({ 'error': 'no valid session found' })
        }

        const { link_id, name, value, meta } = req.body
        const newUpdate = await postUpdate(link_id, name, value, meta)

        return res.status(201).json(newUpdate)
    } catch (err) {
        return res.status(500).json({ 'error': err.message })
    }
})

"PUT  localhost:3000/api/v1/updates?user=test"
updateRouter.put('', async (req, res) => {
    try {
        const userId = req.query.user
        if(!verifySession(userId)) {
            return res.status(400).json({ 'error': 'no valid session found' })
        }

        const updateData = {
            updateId: req.body.update_id,
            newName: req.body.name,
            newValue: req.body.value,
            newMeta: req.body.meta,
            newDate: req.body.created_at
        }

        const newLink = await putUpdate(updateData)

        return res.status(201).json(newLink)
    } catch (err) {
        return res.status(500).json({ 'error': err.message })
    }
})

"DELETE localhost:3000/api/v1/updates?user=test"
updateRouter.delete('', async (req, res) => {
    try {
        const userId = req.query.user
        if(!verifySession(userId)) {
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