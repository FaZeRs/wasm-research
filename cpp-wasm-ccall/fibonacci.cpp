int fibonacci(const int n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

extern "C" {
int fibonacci_wrapper(const int n) { return fibonacci(n); }
}