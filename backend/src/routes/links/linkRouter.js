import { Router } from 'express'
import verifySession from '../../services/auth/verifySession.js'
import multer from 'multer'

import getLinks from './getLinks.js'
import postLink from './postLink.js'
import putLink from './putLink.js'
import deleteLink from './deleteLink.js'

const linkRouter = Router({ mergeParams: true })

const storage = multer.memoryStorage()
const upload = multer({ storage: storage }).array('images', 5)

"GET  localhost:3000/api/v1/links?user=test"
linkRouter.get('', async (req, res) => {
    try {
        const userId = req.query.user
        if (!verifySession(userId)) {
            return res.status(400).json({ 'error': 'no valid session found' })
        }

        // Fetching the links from db
        const links = await getLinks(userId)

        return res.status(200).json(links)
    } catch (err) {
        return res.status(500).json({ 'error': err.message })
    }
})

"POST localhost:3000/api/v1/links?user=test"
linkRouter.post('', upload, async (req, res) => {
    try {
        const userId = req.query.user
        if (!verifySession(userId)) {
            return res.status(400).json({ 'error': 'no valid session found' })
        }

        const { source, target, update } = req.body
        if (update && typeof update === 'string') {
            update = JSON.parse(update)
        } else {
            throw new Error('Missing update Field, wrong Format')
        }

        const imageFiles = req.files
        const newLink = await postLink(userId, source, target, update, imageFiles)

        return res.status(201).json(newLink)
    } catch (err) {
        return res.status(500).json({ 'error': err.message })
    }
})

"PUT  localhost:3000/api/v1/links?user=test"
linkRouter.put('', async (req, res) => {
    try {
        const userId = req.query.user
        if (!verifySession(userId)) {
            return res.status(400).json({ 'error': 'no valid session found' })
        }

        const updateData = {
            linkId: req.body.link_id,
            newSource: req.body.source,
            newTarget: req.body.target,
            newDate: req.body.created_at
        }

        const newLink = await putLink(updateData)

        return res.status(201).json(newLink)
    } catch (err) {
        return res.status(500).json({ 'error': err.message })
    }
})

"DELETE localhost:3000/api/v1/links?user=test"
linkRouter.delete('', async (req, res) => {
    try {
        const userId = req.query.user
        if (!verifySession(userId)) {
            return res.status(400).json({ 'error': 'no valid session found' })
        }

        const { link_id } = req.body
        const success = await deleteLink(link_id)

        return res.status(201).json(success)
    } catch (err) {
        return res.status(500).json({ 'error': err.message })
    }
})

export default linkRouter