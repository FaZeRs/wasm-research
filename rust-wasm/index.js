const { fibonacci } = require('./pkg/rust_wasm.js');
const n = 40;
const result = fibonacci(n);
console.log(`Fibonacci(${n}) = ${result}`);