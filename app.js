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
    await List.findByIdAndDelete(req.params.listId)
    res.send('Succesfully deleted!');
})

app.listen(3000, () => console.log('Server connected on port 3000!'));