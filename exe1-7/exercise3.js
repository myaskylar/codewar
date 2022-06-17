const arr = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
const arr2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];


// solution 

const snail = (array) => {
  const middle = array
    .slice(1, array.length - 1)
    .map((row) => row.slice(1, row.length - 1));

    let newArray = [];


    newArray.push(array[0]);

    newArray.push(array.slice(1, array.length - 1).map((row) => row[row.length - 1]));

    array.length > 1 ? newArray.push(array[array.length - 1].reverse()) : [];

    newArray.push(array
      .slice(1, array.length - 1)
      .reverse()
      .map((row) => row[0]))

    middle.length > 0 ? newArray.push(snail(middle)) : [];

    return newArray.reduce((a, b) => [...a, ...b]);
 
};

//other solution

function snail2(array) {
  var vector = [];
  while (array.length) {
    vector.push(...array.shift());
    array.map((row) => vector.push(row.pop()));
    array.reverse().map((row) => row.reverse());
  }
  return vector;
}

 console.log(snail2(arr));
