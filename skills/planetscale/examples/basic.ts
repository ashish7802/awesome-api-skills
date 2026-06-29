import { connect } from '@planetscale/database';
const config = { url: process.env.DATABASE_URL };
const conn = connect(config);
const results = await conn.execute('SELECT * FROM users');