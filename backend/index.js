import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './src/routes/router.js'
import { createTablesIfNotExist } from './src/services/db/db.js'

const InitializeDatabase = async () => {
    await createTablesIfNotExist()
    console.log('database initialized')
}

const app = express()

const startServer = async () => {
    await InitializeDatabase()

    app.use(cors())
    app.use(express.json())
    app.use('/api/v1', router)

    app.listen(3000, () => {
        console.log('server listens to port 3000')
    })
}

startServer().catch(err => {
    console.error('server error:', err)
    process.exit(1)
})