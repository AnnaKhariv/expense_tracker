
const mongoose = require("mongoose");


mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/products", function (err) {

    if(err){
        return console.log(err);
    } else{
        console.info("Connect to: mongodb://localhost:27017/products");
    }

});

const Expenses = require("./expenseShema");
const Api = require("./apiShema");


const addExpense = (expense) => {
    Expenses.create(expense)


        .then(expense => {
            console.info(expense);
            console.info('New Expense Added');
            mongoose.disconnect();
        })
        .catch(err => {
            console.log(err);
            mongoose.disconnect();
        });
    }


const listExpenses = () => {
    Expenses.find().sort({"dateInput": -1})
        .then(expense => {
            console.info(expense);
            console.info(`${expense.length} expenses`);
            mongoose.disconnect();
        });
    }

const clearExpense = (dateInput) => {
    Expenses.remove({dateInput})
        .then(() => {
            console.info('Expenses By Chosen Date Cleared');
            mongoose.disconnect();
        });
    }

const removeExpenses = () => {
    Expenses.remove()
        .then(() => {
            console.info('Remove All');
            mongoose.disconnect();
        });
    }

const totalExpenses = (convertTo) => {
    Api.create({convertTo})
        .then(() => {
            console.info('Currency Chosen');
            mongoose.disconnect();
        });

    Expenses.aggregate([

            {"$group": {
                    "_id": "$currency",
                    "sum": { "$sum":  "$amount"}
                }}

        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
        });
    }



module.exports = {
    addExpense,
    listExpenses,
    clearExpense,
    removeExpenses,
    totalExpenses,

};


