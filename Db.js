const postgres = require('postgres');
require('dotenv').config();

// Connect to PostgreSQL
const sql = postgres(process.env.PG_URL, {
    ssl: { rejectUnauthorized: false } // Correct SSL option
});

// Function to create tables
async function createTables() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT, age INTEGER)`;
        console.log(' Users table created');

        await sql`CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, name TEXT)`;
        console.log(' Tasks table created');
    } catch (err) {
        console.error(' Error creating tables:', err);
    }
}

// Call function to create tables
createTables();

module.exports = sql;
