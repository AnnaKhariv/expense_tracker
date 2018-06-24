const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const apiShema = new Schema({

    convertTo: {
        type: String, uppercase: true,
        enum: ["EUR", "USD", "UAH", "PLN"],
        default: "EUR"
    },
    totalSum: {
        type: Number
    }

});

const ApiSchema = mongoose.model("apiShema", apiShema);

module.exports = ApiSchema;


