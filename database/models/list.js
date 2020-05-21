const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlegnth: 3
    }
})

const List = mongoose.model('List', ListSchema);

module.exports = List;