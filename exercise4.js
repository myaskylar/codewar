const array = [
  -10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18,
  19, 20,
];

const arrange = (arr) => {
    const count = arr.reduce((a,b)=> ([...a, [b]]), [] )
 return count;
}

console.log(arrange(array));