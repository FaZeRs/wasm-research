const Module = require('./fibonacci.js');
Module.onRuntimeInitialized = () => {
    const n = 40;
    const result = Module.fibonacci(n);
    console.log(`Fibonacci(${n}) = ${result}`);
};