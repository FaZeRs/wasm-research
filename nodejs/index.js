function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const n = Number(process.env.FIBONACCI_N) || 40;
const result = fibonacci(n);
console.log(`Fibonacci(${n}) = ${result}`);
