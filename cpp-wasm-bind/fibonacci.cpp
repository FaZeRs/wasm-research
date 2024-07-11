#include <emscripten/bind.h>

int fibonacci(const int n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

EMSCRIPTEN_BINDINGS(my_module) {
  emscripten::function("fibonacci", &fibonacci);
}