const mongoose = require('mongoose');

const internetAvailable = require('internet-available');

const apiShema = require('./apiShema');
const Expenses = require('./expenseShema');
const convertValue = require('./index');

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const access_key = '7d331d31424c311e32f2ec131b6d6b60';
const url = 'http://data.fixer.io/api/latest?access_key=' + access_key;

//Check if internet available
function checkConnection() {

    internetAvailable()
        .then(() => {
            console.log('Internet available');
            checkData(true);
        })
        .catch(() => {
            console.log('No internet');
            checkData(false);
        });
}//checkConnection

//Check if data from https://fixer.io/ exist
function checkData(connectionStatus) {

    apiShema.findOne({'base': 'EUR'})
        .then(res => {
            if (connectionStatus) {
                if (!res) {
                    console.log('Creating data...');
                    getData(url);
                } else {
                    clearData();
                }
            } else {
                if(res){
                    console.log('Data available, offline mode!');
                    totalData();
                }
                else {
                    console.log('No data, need internet connection!');
                    mongoose.disconnect();
                }

            }
        })
        .catch(err => {
            if (err) {
                throw err;
            }
        });

}//checkData

//Check data from https://fixer.io/
function getData(url) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);

    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4 && xhr.status == 200) {

            let json = JSON.parse(xhr.responseText);

            apiShema.create(json)
                .then(() => {
                    console.log('Data available!');
                    totalData();
                })
                .catch(err => {
                    console.log(err);
                    mongoose.disconnect();
                });
        }
        else {
            console.log('Error! ', xhr.statusText);
        }
    };
    xhr.send();
}

function clearData() {

    apiShema.remove()
        .then(() => {
            console.log('Data updating...');
        })
        .then(() => {
            getData(url);
        })
        .catch(err => {
            console.log(err);
            mongoose.disconnect();
        })
}

function totalData() {

    console.info(`Currency Chosen: ${convertValue.convertTo}`);

    Expenses.aggregate([
            {
                '$group': {
                    '_id': '$currency',
                    'sum': {'$sum': '$amount'}
                }
            }
        ],
         function (err, resultGroup) {

            if (err) {
                console.log(err);
            }
            console.log(resultGroup);

            apiShema.findOne({'base': 'EUR'})
                .then(resultCurrency => {

                    //Find total sum in EUR, because https://fixer.io base can be only EUR
                    let sumEUR = 0, totalSum = 0;

                    for (let i in resultGroup) {
                        sumEUR  += resultGroup[i].sum / eval('resultCurrency.rates' + '.' + resultGroup[i]._id);
                        let sumtemp  = resultGroup[i].sum / eval('resultCurrency.rates' + '.' + resultGroup[i]._id);
                        console.log(`${resultGroup[i]._id} in EUR : ${sumtemp}`);
                    }

                    //Convert total sum in chosen currency
                    if(convertValue.convertTo == 'EUR'){
                        totalSum = sumEUR;
                    }
                    else {
                        totalSum = sumEUR * eval('resultCurrency.rates' + '.' + convertValue.convertTo);
                    }

                    console.log(`Total expenses in chosen currency : ${totalSum.toFixed(2)}`);
                    mongoose.disconnect();
                });
        }
    )//aggregate

}

module.exports = {
    checkConnection: checkConnection
}
