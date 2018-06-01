async function loadJSON(fileSource) {
  const res = await fetch(fileSource);
  return await res.json();
}

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