
const { PrismaClient } = require('@prisma/client')
const {PrismaMariaDb} = require('@prisma/adapter-mariadb')
require('dotenv').config()


// Function to parse connection string
function parseConnectionString(connectionString) {
    try {
        const url = new URL(connectionString.replace("mysql://", "mariadb://"));
        return {
        host: url.hostname,
        port: parseInt(url.port) || 3306,
        user: url.username,
        password: url.password,
        database: url.pathname.slice(1),
        };
    } catch (error) {
        console.error("Error parsing connection string:", error);
        throw error;
    }
    }

    const config = parseConnectionString(process.env.DATABASE_URL);

    const adapter = new PrismaMariaDb({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: 5,
    });

    const prisma = new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
});

module.exports = prisma;