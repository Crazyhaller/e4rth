import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

/**
 * PostgreSQL connection pool
 * Uses DATABASE_URL from env
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

/**
 * Drizzle instance
 * - typed with schema
 * - used across entire app
 */
export const db = drizzle(pool, {
  schema,
})
