#!/usr/bin/env node

'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/products', function (err) {

    if (err) throw err;
    console.log('Successfully connected to mongodb://localhost:27017/products');

});

const Expenses = require('./expenseShema');
const getApi = require('./getApi');

const command   = process.argv[2];
const dateInput = process.argv[3];
const amount    = process.argv[4];
const currency  = process.argv[5];
const product   = process.argv[6];
const convertTo = process.argv[3];

switch (command) {
    case '--add':
        addExpense({dateInput, amount, currency, product});
        break;
    case '--list':
        listExpenses();
        break;
    case '--clear':
        clearExpense(dateInput);
        break;
    case '--remove':
        removeExpenses();
        break;
    case '--total':
        totalExpenses(convertTo);
        break;
    case '--help':
        help();
        break;
    default:
        console.log("Command not found");
        mongoose.disconnect();
}

function help(){
    console.log(`
        DESCRIPTION: 
        Personal expenses management application that allows users to track how much money have they spent.
        
        Options:

        --help                                  output usage information

        Commands:
    
        --add [date amount currency product]        Add An Expense
        --list                                      List all expenses sorted by date
        --clear [date]                              Clear An Expense by Chosen Date
        --remove                                    Remove All Expenses
        --total [convertTo]                         Total Amount Of Money Spend with currency converter

        `);
    mongoose.disconnect();
}

function addExpense ({dateInput, amount, currency, product}){
    let expense = {dateInput, amount, currency, product};

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


function listExpenses(){
    Expenses.find().sort({'dateInput': -1})
        .then(expense => {
            console.info(expense);
            console.info(`${expense.length} expenses`);
            mongoose.disconnect();
        });
}


function clearExpense(dateInput){
    Expenses.remove({dateInput})
        .then(() => {
            console.info('Expenses By Chosen Date Cleared');
            mongoose.disconnect();
        })

}

function removeExpenses(){
    Expenses.remove()
        .then(() => {
            console.info('Remove All');
            mongoose.disconnect();
        });
}

function totalExpenses(convertTo){

    convertTo = convertTo.toUpperCase();
    exports.convertTo = convertTo;
    getApi.checkConnection();


}
