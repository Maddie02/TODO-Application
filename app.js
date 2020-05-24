const express = require('express');
const mongoose = require('./database/mongoose');
const List = require('./database/models/list');
const Task = require('./database/models/task');

const app = express();
app.use(express.json());

app.get('/lists', (req, res) => {
    List.find({})
    .then(lists => res.send(lists))
    .catch((error) => console.log(error));
})

app.post('/lists', (req, res) => {
    let list = new List(req.body);

    list.save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
})

app.get('/lists/:listId', async (req, res) => {
    let foundList = await List.find({ _id: req.params.listId });
    res.send(foundList);
})

app.patch('/lists/:listId', async (req, res) => {
    let updatedList = await List.findByIdAndUpdate(req.params.listId, { $set: req.body })
    res.send(updatedList);
})

app.delete('/lists/:listId', async (req, res) => {

    const deleteTasks = (list) => {
        Task.deleteMany({_listId: list._id})
            .then(() => res.send('Succesfully deleted list and tasks!'))
            .catch((error) => console.log(error));
    }

    List.findByIdAndDelete(req.params.listId)
        .then((list) => deleteTasks(list))
        .catch((error) => console.log(error));
})

app.get('/lists/:listId/tasks', async (req, res) => {
    let tasks = await Task.find({ _listId: req.params.listId });
    res.send(tasks);
})

app.post('/lists/:listId/tasks', async (req, res) => {
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });

    try {
        newTask.save();
        res.send(newTask);
    }
    catch (error) {
        console.log(error);
    }
    
})

app.get('/lists/:listId/tasks/:taskId', async (req, res) => {
    let task = await Task.find({ _id: req.params.taskId });
    res.send(task);
})

app.patch('/lists/:listId/tasks/:taskId', async (req, res) => {
    let updatedTask = await Task.findByIdAndUpdate(req.params.taskId, { $set: req.body })
    res.send(updatedTask);
})

app.delete('/lists/:listId/tasks/:taskId', async (req, res) => {
    let taskToBeDeleted = await Task.findByIdAndDelete(req.params.taskId);
    res.send("Succesfully deleted!");
})

app.listen(3000, () => console.log('Server connected on port 3000!'));