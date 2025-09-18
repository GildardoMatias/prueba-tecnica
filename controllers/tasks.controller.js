import db from "../db/db";


// Create a task
export const insertTask = async (userId, title, description) => {
  const result = await db.runAsync('INSERT INTO tasks (userId, title, description) values (?, ?, ?)', userId, title, description);
  console.log('inserted task', result)
  return result;
}

// Obtener todas la tareas
export const getAllTasks = async (group_id) => {
  const allRows = await db.getAllAsync('SELECT * FROM tasks ');
  console.log('allRows', allRows)
  return allRows;
}

// Obtener la tareas de un usuario
export const getTasksByUserId = async (userId) => {
  const allRows = await db.getAllAsync('SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC', userId);
  console.log('allRows', allRows)
  return allRows;
}


// Update a task
export const updateTask = async (taskId, title, description) => {
  const result = await db.runAsync('UPDATE tasks SET title = ?, description = ? WHERE id = ?', title, description, taskId);
  console.log('updated task', result)
  return result;
}



// Delete
export const deleteTask = async (taskId) => {
  const result = await db.runAsync('DELETE FROM tasks WHERE id = ?', taskId);
  console.log('deleted task', result)
  return result;
}