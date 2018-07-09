const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const expensesShema = new Schema({
    dateInput: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(v);
            },
            message: "{VALUE} is not a valid date format!"
        },
        required: [true, "Date required!"]
    },
    amount: {
        type: Number,
        required: [true, "Amount required!"]
    },
    currency: {
        type: String, uppercase: true,
        default: "EUR",
        required: [true, "Currency required!"],
    },
    product: {
        type: [String],
        trim: true,
        required: [true, "Product required!"],
    }

});

const Expences = mongoose.model("Expenses", expensesShema);

module.exports = Expences;


