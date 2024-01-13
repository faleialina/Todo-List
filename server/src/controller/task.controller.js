const express = require('express');
const { createTask, updateTask, getAllTask, getTaskById, deleteTask } = require('../service/task.service');
const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const data = await getAllTask();
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }
});

route.get('/:_id', async (req, res) => {
    try {
        const data = await getTaskById(req.params._id, req.body);
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }
});

route.post('/', async (req, res) => {
    try {
        const data = await createTask(req.body);
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }
});

route.put('/:_id', async (req, res) => {
    try {
        const data = await updateTask(req.params._id, req.body);
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }
});
route.delete('/:_id', async (req, res) => {
    try {
        const data = await deleteTask(req.params._id);
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = route;
