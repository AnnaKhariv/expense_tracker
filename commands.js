#!/usr/bin/env node
const program = require("commander");

const {
    addExpense,
    listExpenses,
    clearExpense,
    removeExpenses,
    totalExpenses,


} = require("./index");

program
    .version("1.0.0", "-v, --version")
    .description("Personal expenses management application that allows users to track how much money have they spent.")

program
    .command("add <date> <amount> <currency> <product>")
    .alias("a")
    .description("Add An Expense")
    .action((dateInput, amount, currency, product) => {
        addExpense({dateInput, amount, currency, product});
    });

program
    .command("list")
    .alias("l")
    .description('List all expenses sorted by date')
    .action(() => listExpenses());

program
    .command('clear <date>')
    .alias('c')
    .description('Clear An Expense by Chosen Date')
    .action(dateInput => clearExpense(dateInput));

program
    .command('remove')
    .alias('r')
    .description('Remove All Expenses')
    .action(() => removeExpenses());

program
    .command('total <convertTo>')
    .alias('t')
    .description('Total Amount Of Money Spend with currency converter')
    .action((convertTo) => totalExpenses(convertTo));

program.parse(process.argv);