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
