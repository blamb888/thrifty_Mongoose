// Algorithmic Question - Joining Overlapping Arrays Notes:
const input1 = [1, 2, 3, 4];
const input2 = [3, 4, 5, 6];
// Expected result: [1, 2, 3, 4, 5, 6]
// We can filter out input2 using input1.indexOf(input2's item) < 0 as an argument
// Any value that is not present in input1 will return -1, i.e. non-duplicates
// will pass the test and form the new array to be concat'd to input1

console.log(input2.filter((item) => input1.indexOf(item) < 0));
console.log({
  duplicateToBeExcluded: `3 returns: ${input1.indexOf(input2[0])}`,
  nonDuplicateToBeIncluded: `Whereas 5 returns: ${input1.indexOf(input2[3])}`
})

// My initial thinking was to use the merge operator and Set
// but since a value in a Set may occur
// only once this won't work for our purposes.
const input7 = [5, 5, 1, 2];
const input8 = [5, 1, 7, 8];
// Expected result: [5, 5, 1, 2, 5, 1, 7, 8]
const newArr = [...new Set([...input7, ...input8])];
console.log(newArr, "vs. [5, 5, 1, 2, 5, 1, 7, 8]")
//========================================================
//========================================================
// ETL Notes:
// Run a GET Request through PostMan to see what kind of response is returned
// https://hiring-ld-takehome.herokuapp.com/transactions?fromDate=2021-08-08&toDate=2021-08-12

// Take a look at the data response (see data.json) and notice some irregularities:
// Notice that Amount is displayed as a string
// Notice that Date is missing YYYY-
// Notice that Description is using double quotes, perhaps not a huge deal

// Big notices:
// input fromDate of 2021-08-08 has been transformed to 2021-10-7
// input toDate of 2021-08-12 has been transformed to 2021-11-7

// Okay, so we're going to need to make an API call
//      -- Let's use fetch() with undici, this uses
//      modules/import/export and a newer version of Node
//      but also allows top level await.
//      Also the name is very cool.
// We're going to be working with date/time inputs that need some tooling
//      -- Let's use moment.js because it
//      simplifies working with real-world time
//      and gives very accurate results
// We are going ot be outputting CSV's with headers
//      -- Let's use csv-writer because it
//      is simple, streamlined, and allows for
//      easy file w/ header creation.
// We aren't uploading the CSV anywhere so we can forgo setting up an sftp Client

// Let's install our packages with NPM

// First let's find the diffference between our input date/times and
// what the API responded with:
import pkg from 'moment';
const { moment } = pkg;

const originalDateFrom = pkg('2021-08-08');
const outputDateFrom = pkg('2021-10-07');
const diff = outputDateFrom.diff(originalDateFrom);
// 5184000000 mls

const originalDateTo = pkg('2021-08-12');
const outputDateTo = pkg('2021-11-07');
const diff2 = outputDateTo.diff(originalDateTo);
// 7516800000 mls
console.log(diff, diff2);
console.log(7516800000 - 5184000000);
// 2332800000 mls
// 27 day difference in altered fromDate and toDate
// Perhaps our query needs to be at least 28 days apart to avoid trouble.
// Let's extend the time gap between our fromDate and toDate to work with the API
// Then let's write helper methods to alter the input to pre-empt what the API
// will return, so that it reflects the dates we've supplied (see helpers.js)

// Let's take care of the data formats from the API so our CSV entries
// are the way we'd like them to be:

//Take care of missing Year in Date
const fromDate = '2021-08-08';
const outPutString = fromDate.substring(0, fromDate.indexOf('-'));
console.log(outPutString);

// Take care of String to Integer on Amount
const int = "65,340.5";
const newInt = int.replace(/,/g, '');
console.log(parseFloat(newInt));


// Alright, so far so good. Let's test out our
// header and csv creation with csv-writer and our data.json
import {createObjectCsvWriter as createCsvWriter} from 'csv-writer';
import { promises as fs } from 'fs';
const txt = await fs.readFile('data.json');
const parsed_txt = JSON.parse(txt);
const data = parsed_txt.data;

// You can designate the path below to specify which file to create.
const csvWriter = createCsvWriter({
  // path: 'headerTest.csv',
  path: 'test.csv',
  header: [
    {id: 'date', title: 'Date'},
    {id: 'amount', title: 'Amount'},
    {id: 'description', title: 'Description'}
   ]
});
// await csvWriter.writeRecords(data);

// Awesome!!!
// Okay time to try and implement those fixes to the data format from before
// We'll need to use a loop

console.log('number of records =', data.length);
for(let i = 0; i < data.length; i++) {
  let records = [{
    date: `${fromDate.split('-')[0]}-${data[i].date}`,
    amount: parseFloat(data[i].amount.replace(/,/g, '')),
    description: `'${data[i].description}'`
  }];
  await csvWriter.writeRecords(records);
};

// Okay looking good. I really love top level await, but let's wrap it in
// a single named async function that accepts 2 arguments
// (fromDate, toDate)
// this way we can export our function easily.
// Test it with an API call...
// SUCCESS!
