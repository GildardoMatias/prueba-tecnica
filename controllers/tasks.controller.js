import db from "../db/db";

// ----------------------------------------------//
// Controladores para la entidad Task (Tareas)   //
// ----------------------------------------------//

// Guardar una nueva tarea en la base de datos
export const insertTask = async (userId, title, description) => {
  const result = await db.runAsync('INSERT INTO tasks (userId, title, description) values (?, ?, ?)', userId, title, description);
  console.log('inserted task', result)
  return result;
}

// Obtener todas la tareas de la base de datos
export const getAllTasks = async (group_id) => {
  const allRows = await db.getAllAsync('SELECT * FROM tasks ');
  console.log('allRows', allRows)
  return allRows;
}

// Obtener las tareas de un usuario
export const getTasksByUserId = async (userId) => {
  const allRows = await db.getAllAsync('SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC', userId);
  console.log('allRows', allRows)
  return allRows;
}


// Actualizar una tarea existente dada su ID
export const updateTask = async (taskId, title, description) => {
  const result = await db.runAsync('UPDATE tasks SET title = ?, description = ? WHERE id = ?', title, description, taskId);
  console.log('updated task', result)
  return result;
}

// Eliminar una tarea dada su ID
export const deleteTask = async (taskId) => {
  const result = await db.runAsync('DELETE FROM tasks WHERE id = ?', taskId);
  console.log('deleted task', result)
  return result;
}