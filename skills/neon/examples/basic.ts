import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
const result = await sql`SELECT * FROM users WHERE id = ${userId}`;