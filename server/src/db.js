const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/toDoList')

const TableTask = mongoose.model('tasks', {
    title: String,
    description: String,
    status: String
});

const ObjectId = mongoose.Types.ObjectId

module.exports = { TableTask, ObjectId }