'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/products', function (err) {

    if (err) throw err;
    console.log('Successfully connected to mongodb://localhost:27017/products');

});

const Expenses = require('./expenseShema');
const getApi = require('./getApi');

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
    Expenses.find().sort({'dateInput': -1})
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
    convertTo = convertTo.toUpperCase();
    exports.convertTo = convertTo;
    getApi.checkConnection();

}

module.exports = {
    addExpense,
    listExpenses,
    clearExpense,
    removeExpenses,
    totalExpenses,
};



