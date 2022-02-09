import { fetch, Request, Response } from 'undici';
import {createObjectCsvWriter as createCsvWriter} from 'csv-writer';
import { newFromDate, newToDate } from './helpers.js';

const fromDate = '2021-08-08';
const toDate = '2021-09-05';

export async function finalFunction(fromDate, toDate) {
  const csvWriter = createCsvWriter({
    path: 'test.csv',
    header: [
      {id: 'date', title: 'Date'},
      {id: 'amount', title: 'Amount'},
      {id: 'description', title: 'Description'}
     ]
  });
  const newFrom = newFromDate(fromDate);
  const newTo = newToDate(toDate);
  console.log(newFrom, newTo);

  const requestURI = `https://hiring-ld-takehome.herokuapp.com/transactions?fromDate=${newFrom}&toDate=${newTo}`
  console.log(requestURI);

  const raw_data = await fetch(`${requestURI}`);
  const json = await raw_data.json();
  const data = json.data;


  // const txt = await fs.readFile('data.json');
  // const parsed_txt = JSON.parse(txt);
  // const data = parsed_txt.data;

  console.log('number of records =', data.length)
  for(let i = 0; i < data.length; i++) {
    let records = [{
      date: `${fromDate.split('-')[0]}-${data[i].date}`,
      amount: parseFloat(data[i].amount.replace(/,/g, '')),
      description: `'${data[i].description}'`
    }];
    await csvWriter.writeRecords(records);
  };
}

finalFunction(fromDate, toDate);
