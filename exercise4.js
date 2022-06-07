const array = [
  -10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18,
  19, 20,
];

const arrange = (arr) => {
    let emt = [];
 arr.map((elem, index)=>{
     //index == 0 ? emt.push(elem): null
    elem - arr[index -1] == 1 && elem - arr[index + 1] != -1 ? emt.push(elem) : null;
    elem - arr[index - 1] != 1 && elem - arr[index + 1] != -1 ? emt.push(elem) : null;
    elem - arr[index - 1] != 1 && elem - arr[index + 1] == -1 ? emt.push(elem) : null;
    elem - arr[index - 1] == 1 && elem - arr[index + 1] == -1 ? emt.push("-") : null;
 })

let filterArr = emt
  .filter((elem, index) => {
    return elem != emt[index + 1];
  })

 return filterArr.reduce(
   (text, value, i, array) =>
     text + (array[i - 1] == "-" || array[i + 1] != "-" && value != "-" ? value + "," : value)
 );

}
//"-10--8,-6,-3-1,3-5,7-11,14,15,17-20"
//  return filterArr.reduce(
//    (text, value, i, array) =>
//      text + (i < array.length - 1 ? ", " : " or ") + value
//  );
console.log(arrange(array));