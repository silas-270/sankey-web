import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

const createTablesIfNotExist = async () => {
    await pool.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE TABLE IF NOT EXISTS links (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id VARCHAR(50) NOT NULL, -- User table not managed from this backend, hence no ref
            source VARCHAR(50) NOT NULL,
            target VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS updates (
            update_id SERIAL PRIMARY KEY,
            link_id UUID NOT NULL,
            name VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            value FLOAT NOT NULL,
            meta JSONB,
            CONSTRAINT fk_link
                FOREIGN KEY(link_id)
                REFERENCES links(id)
                ON DELETE CASCADE
        );
    `)
}

export {
    pool,
    createTablesIfNotExist
}