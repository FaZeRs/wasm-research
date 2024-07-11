#include <stdio.h>

int fibonacci(const int n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
  const int n = 40;
  const int result = fibonacci(n);
  printf("Fibonacci(%d) = %d\n", n, result);
  return 0;
}