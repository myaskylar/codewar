// question 1
const encrypt = (text, n) => {
  if (n <= 0 || !text) {
    return text;
  }
  let oddNumber = text.split("").filter((str, index) => index % 2 === 1);
  let evenNumber = text.split("").filter((str, index) => index % 2 === 0);
  return encrypt(oddNumber.concat(evenNumber).join(""), n - 1);
};

console.log(encrypt("012345", 2));

// question 2
const decrypt = (encryptedText, n) => {
  if (n <= 0 || !encryptedText) {
    return encryptedText;
  }

  let halve = encryptedText.length / 2;
  let first = encryptedText.split("").slice(halve);
  let second = encryptedText.split("").slice(0, halve);
  let text = [];
  for (let i = 0; i < encryptedText.length; i++) {
    if (i % 2 === i - 1) {
      text.push(second[i]);
      text.push(first[i]);
    } else {
      text.push(first[i]);
      text.push(second[i]);
    }
  }
  return decrypt(text.join(""), n - 1);
};

console.log(decrypt("304152", 2));
