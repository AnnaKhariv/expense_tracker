# expense_tracker
Personal expenses management offline application that allows users to track how much money have they spent. 

IMPORTANT! Uses Mongoose - make sure you have installed MongoDB!

# Usage

# Installation
Install the dependencies
	
	$ npm install
	
# Create Symlink | Without Symlink

	$ npm link | 
	
# Commands | Without Symlink

Help (--help)- command shows information about expense_tracker.

	$ expense_tracker --help | node index.js --help
	
<b>Add New Expense (--add \<date\> \<amount\> \<currency\> \<product\>)</b> - command adds expense entry to the list of user expenses. </br> 
</br>
Command accepts following parameters:</br>
\<date\> — is the date when expense occurred in format YYYY-MM-DD. </br>
\<amount\> — is an amount of money spent. </br>
\<currency\>  — the currency in which expense occurred. </br>
\<product\> — is the name of product purchased. </br>

	$ expense_tracker --add <date> <amount> <currency> <product> | node index.js --add <date> <amount> <currency> <product> 
	
List Expenses By Date (--list ) -command shows the list of all expenses sorted by date decrease.

	$ expense_tracker --list | node index.js --list
	
Clear Expense By Chosen Date (--clear \<date\>) - command removes all expenses for specified date, where \<date\> — is the date for which all expenses removed.

	$ expense_tracker --clear <date> | node index.js --clear <date>
	
Remove All Expense (--remove) - command removes all expenses from list.

	$ expense_tracker --remove | node index.js --remove 
	
Total Amount (--total <convertTo>) - command take a list of exchange rates from http://fixer.io, calculate the total amount of money spent and
present it to user in specified currency, where \<convertTo\> — is the currency in which total amount of expenses presented.


	$ expense_tracker --total <convertTo> | node index.js --total <convertTo>
	

	
