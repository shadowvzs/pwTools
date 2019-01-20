
const a = Buffer.from("pista bacsi");
//const b = Buffer.from("0x6120", "hex");
let b = a.indexOf('6120', 0, 'hex');
let c = a.slice(b);
console.log(a, b, c)