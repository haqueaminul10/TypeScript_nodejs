import db from '../../config/database.js';

const createUserTable = async (): Promise<void> => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(30) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  try {
    await db.query(sql);
    console.log('Users table created');
  } catch (err) {
    console.error('📌 ~ createUserTable ~ err:', err);
  }
};

// Create table on module load
createUserTable().catch((err) =>
  console.error('Failed to create users table:', err)
);

export { createUserTable };
