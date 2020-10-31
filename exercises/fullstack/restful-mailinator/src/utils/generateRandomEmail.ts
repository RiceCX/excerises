export default function generateRandomEmail(length = 10) {
  let result = "";
  const dictonary =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  for (var i = 0; i < length; i++) {
    result += dictonary.charAt(Math.floor(Math.random() * dictonary.length));
  }
  return `${result}@doujinfu.cks`;
}
