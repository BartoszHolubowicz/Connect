async function loadJSON(fileSource) {
  const res = await fetch(fileSource);
  return await res.json();
}

//#region Matrix functions
function generateMatrix(i, j, val) { // Returns a ixj matrix filled with vals
  let array = [];
  for (let y = 0; y < i; y++) {
    let row = [];
    for (let x = 0; x < j; x++)
      row.push(val);
    array.push(row);
  }
  return array;
}
//#region Functions that do something for all specific values in a matrix
function forAllZeros(matrix, callback) {
  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix[i].length - 1; j++) {
      if (!matrix[i][j])
        callback(i, j);
    }
  }
}
function forAllOnes(matrix, callback) {
  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix[i].length - 1; j++) {
      if (matrix[i][j])
        callback(i, j);
    }
  }
}
function forAllSpecific(matrix, val, callback) {
  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix[i].length - 1; j++) {
      if (matrix[i][j] === val)
        callback(i, j);
    }
  }
}
function forAllNotSpecific(matrix, val, callback) {
  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix[i].length - 1; j++) {
      if (matrix[i][j] !== val)
        callback(i, j);
    }
  }
}
//#endregion
function countInMatrix(matrix, val) {
  let count = 0;
  for (let row of matrix)
    for (let num of row)
      if (num === val)
        count++;
  return count;
}
function transpose(matrix) {
  let transposed = [],
      row;
  for (let i = 0; i < matrix[0].length; i++) {
    row = [];
    for (let j = 0; j < matrix.length; j++)
      row.push(matrix[j][i]);
    transposed.push(row);
  }
  return transposed;
}
function reverseRows(matrix) {
  let reversed = [];
  for (let row of matrix)
    reversed.push(row.reverse());
  return reversed;
}
//#endregion