const express = require('express');
const mongoose = require('./database/mongoose');
const List = require('./database/models/list');
const Task = require('./database/models/task');

const app = express();

app.use(express.json);

app.get('/lists', (req, res) => {
    Task.find({})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));
})


app.listen(3000, () => console.log('Server connected on port 3000!'));