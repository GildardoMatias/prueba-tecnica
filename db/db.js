import * as SQLite from 'expo-sqlite';

// const db = await SQLite.openDatabaseAsync('tasks.db');
const db = SQLite.openDatabaseSync('tasks');

export const createTables = async () => {
        await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_tasks_userId ON tasks(userId);
        `);
    console.log('Initializing DB corrreact -----')
}

export default db;