const Module = require("./fibonacci.js");
Module.onRuntimeInitialized = () => {
  const n = Number(process.env.FIBONACCI_N) || 40;
  const result = Module.ccall("fibonacci_wrapper", "number", ["number"], [n]);
  console.log(`Fibonacci(${n}) = ${result}`);
};
