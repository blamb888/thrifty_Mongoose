const input1 = [1, 2, 3, 4];
const input2 = [3, 4, 5, 6];
// Expected result: [1, 2, 3, 4, 5, 6]
const input3 = [1, 2, 3, 4];
const input4 = [5, 6, 7, 8];
// Expected result: [1, 2, 3, 4, 5, 6, 7, 8]
const input5 = [1, 2, 1, 2];
const input6 = [1, 2, 7, 8];
// Expected result: [1, 2, 1, 2, 7, 8]
const input7 = [5, 5, 1, 2];
const input8 = [5, 1, 7, 8];
// Expected result: [5, 5, 1, 2, 5, 1, 7, 8]

const joinArrays = (array1, array2) => {
  const newArr = array1.concat(array2.filter((item) => array1.indexOf(item) < 0))
  return newArr
}

const results = {
  result1: joinArrays(input1, input2),
  expected1: '[1, 2, 3, 4, 5, 6]',
  result2: joinArrays(input3, input4),
  expected2: '[1, 2, 3, 4, 5, 6, 7, 8]',
  result3: joinArrays(input5, input6),
  expected3: '[1, 2, 1, 2, 7, 8]',
  result4: joinArrays(input7, input8),
  expected4: '[5, 5, 1, 2, 5, 1, 7, 8]'
};

console.log(results);

