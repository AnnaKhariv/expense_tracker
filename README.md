# expense_tracker
Personal expenses management application that allows users to track how much money have they spent. Uses Mongoose, Commander.js.

# Usage

# Installation
Install the dependencies
	
	$ npm install
	
# Create Symlink

	$ npm link
	
# Commands

Help (-h, -help)- command shows information about expense_tracker.

	$ expense_tracker -help
	
<b>Add New Expense (a \<date\> \<amount\> \<currency\> \<product\>, add \<date\> \<amount\> \<currency\> \<product\>)</b> - command adds expense entry to the list of user expenses. </br> 
</br>
Command accepts following parameters:</br>
\<date\> — is the date when expense occurred in format YYYY-MM-DD. </br>
\<amount\> — is an amount of money spent. </br>
\<currency\>  — the currency in which expense occurred in options: USD, UAH, PLN, EUR. </br>
\<product\> — is the name of product purchased. </br>

	$ expense_tracker add <date> <amount> <currency> <product>
	
List Expenses By Date (-l , -list ) -command shows the list of all expenses sorted by date decrease.

	$ expense_tracker list 
	
Clear Expense By Chosen Date (c \<date\> , clear \<date\>) - command removes all expenses for specified date, where \<date\> — is the date for which all expenses removed.

	$ expense_tracker clear <date> 
	
Remove All Expense (r, remove) - command removes all expenses from list.

	$ expense_tracker remove
	
Total Amount (t <convertTo>, total <convertTo>) - command take a list of exchange rates from http://fixer.io, calculate the total amount of money spent and
present it to user in specified currency, where \<convertTo\> — is the currency in which total amount of expenses presented. [not avalible]


	$ expense_tracker total <convertTo>
	

	
