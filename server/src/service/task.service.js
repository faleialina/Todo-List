const { createTaskDB, updateTaskDB, getAllTaskDB, getTaskByIdDB, deleteTaskDB } = require('../repository/task.repository')

async function getAllTask() {
    const data = await getAllTaskDB();
    return data;
}
async function getTaskById(_id) {
    const data = await getTaskByIdDB(_id);
    return data;
}
async function createTask(task) {
    const data = await createTaskDB(task);
    return data;
}
async function updateTask(_id, task) {
    const data = await updateTaskDB(_id, task);
    return data;
}
async function deleteTask(_id) {
    const data = await deleteTaskDB(_id);
    return data;
}

module.exports = { createTask, updateTask, getAllTask, getTaskById, deleteTask};