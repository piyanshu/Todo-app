const mongoose = require('mongoose');
const listschema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});
const list = mongoose.model('list', listschema);
module.exports = list;