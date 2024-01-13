const { TableTask, ObjectId } = require('../db');

async function getAllTaskDB() {
    const data = await TableTask.find();
    return data;
}
async function getTaskByIdDB(_id) {
    const data = await TableTask.find({ _id: new ObjectId(_id) })
    return data;
}
async function createTaskDB(task) {
    await TableTask.create(task);
    const data = await TableTask.find();
    return data;
}
async function updateTaskDB(_id, task) {
    await TableTask.updateOne({ _id: new ObjectId(_id) }, { $set: task });
    const data = await TableTask.find();
    return data;
}
async function deleteTaskDB(_id) {
    await TableTask.deleteOne({ _id: new ObjectId(_id) });
    const data = await TableTask.find();
    return data;
}

module.exports = { createTaskDB, updateTaskDB, getAllTaskDB, getTaskByIdDB, deleteTaskDB };