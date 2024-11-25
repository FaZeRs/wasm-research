const { fibonacci } = require("./pkg/rust_wasm.js");
const n = Number(process.env.FIBONACCI_N) || 40;
const result = fibonacci(n);
console.log(`Fibonacci(${n}) = ${result}`);
