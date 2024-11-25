#include <cstdlib>
#include <stdio.h>

int fibonacci(const int n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
  const char *n_str = std::getenv("FIBONACCI_N");
  const int n = n_str ? std::atoi(n_str) : 40;
  const int result = fibonacci(n);
  printf("Fibonacci(%d) = %d\n", n, result);
  return 0;
}