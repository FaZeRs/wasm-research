const addon = require("bindings")("fibonacci");

const n = Number(process.env.FIBONACCI_N) || 40;
const result = addon.fibonacci(n);
console.log(`Fibonacci(${n}) = ${result}`);
