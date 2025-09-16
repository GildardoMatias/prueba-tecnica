import db from "../db/db";

// Create user
export const insertUser = async (name, email, password) => {
    const result = await db.runAsync('INSERT INTO users (name, email, password) values (?, ?, ?)', name, email, password);
    console.log('Result of insertion: -----------> ', result)
    return result;
}

// Obtener todos los usuarios
export const getAllUsers = async () => {
    const allRows = await db.getAllAsync('SELECT * FROM users');
    console.log(allRows)
    return allRows;
}

// Obtener un usuarios
export const getUsersByMail = async (email) => {
    const allRows = await db.getAllAsync('SELECT * FROM users WHERE id = ?', email);
    console.log(allRows)
}

export const getUserByCredentials = async (email, password) => {
    const user = await db.getFirstAsync('SELECT * FROM users WHERE email = ? AND password = ?', email, password)
    console.log('For -----> ', { email, password })
    console.log('Found for -----> ', user)
    return user;
}

// Update user


// Delete User