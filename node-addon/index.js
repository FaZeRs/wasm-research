const addon = require('bindings')('fibonacci');

const n = 40;
const result = addon.fibonacci(n);
console.log(`Fibonacci(${n}) = ${result}`);