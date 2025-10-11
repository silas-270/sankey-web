import { Router } from 'express'

import linkRouter from './links/linkRouter.js'
import updateRouter from './updates/updateRouter.js'

const router = Router({ mergeParams: true })

router.use('/links', linkRouter)
router.use('/updates', updateRouter)

export default router