const array = [
  -10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18,
  19, 20,
];

const arrange = (arr) => {
    let emt = [];
 arr.map((elem, index)=>{
     //index == 0 ? emt.push(elem): null
     elem - arr[index -1] == 1 && elem - arr[index + 1] != -1 ? emt.push(elem) : "-";
     elem - arr[index -1] != 1 && elem - arr[index + 1] != -1 ? emt.push(elem) : "-";
    elem - arr[index - 1] != 1 && elem - arr[index + 1] == -1 ? emt.push(elem) : "-";
 })
 return emt;
}

console.log(arrange(array));