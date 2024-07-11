#include <napi.h>

int fibonacci(const int n) {
  if (n <= 1)
    return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

Napi::Number FibonacciWrapped(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  int n = info[0].As<Napi::Number>().Int32Value();
  int result = fibonacci(n);
  return Napi::Number::New(env, result);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "fibonacci"),
              Napi::Function::New(env, FibonacciWrapped));
  return exports;
}

NODE_API_MODULE(fibonacci, Init)