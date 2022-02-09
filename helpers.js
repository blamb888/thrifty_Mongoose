import pkg from 'moment';
const { moment } = pkg;

export function newFromDate(fromDate) {
  return pkg(`${fromDate}`).subtract('5184000000', "milliseconds").format('YYYY-MM-DD');
}
export function newToDate(toDate) {
  return pkg(`${toDate}`).subtract('7516800000', 'milliseconds').format('YYYY-MM-DD');
}
