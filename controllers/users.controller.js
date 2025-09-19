import db from "../db/db";

// -----------------------------------------------//
// Controladores para la entidad User (Usuarios)  //
// -----------------------------------------------//


// Guardar un nuevo usuario en la base de datos
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

// Obtener un usuario por su correo electrónico
export const getUsersByMail = async (email) => {
    const allRows = await db.getAllAsync('SELECT * FROM users WHERE id = ?', email);
    console.log(allRows)
}

// Obtener un usuario por sus credenciales (correo y contraseña)
export const getUserByCredentials = async (email, password) => {
    const user = await db.getFirstAsync('SELECT * FROM users WHERE email = ? AND password = ?', email, password)
    console.log('For -----> ', { email, password })
    console.log('Found for -----> ', user)
    return user;
}

// Actualizar un usuario
export const updateUser = async (id, name, email, password) => {
    const result = await db.runAsync('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', name, email, password, id);
    console.log('Updated user', result)
    return result;
}

// Eliminar un usuario
export const deleteUser = async (id) => {
    const result = await db.runAsync('DELETE FROM users WHERE id = ?', id);
    console.log('Deleted user', result)
    return result;
}