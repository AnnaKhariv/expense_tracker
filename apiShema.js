const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apiShema = new Schema({

    base: String,
    date: Date,
    rates: {}

});

const ApiSchema = mongoose.model('apiShema', apiShema);

module.exports = ApiSchema;


