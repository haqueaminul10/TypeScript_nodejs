import mysql from 'mysql2/promise';
// Database configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'typescript_app',
};
// Create connection pool (recommended for better performance)
const pool = mysql.createPool(dbConfig);
// Test connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the MySQL database');
        connection.release();
    }
    catch (err) {
        console.error('Error connecting to the database:', err);
    }
}
testConnection();
export default pool;
//# sourceMappingURL=database.js.map