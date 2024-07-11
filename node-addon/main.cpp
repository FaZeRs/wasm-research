#include <node.h>

int fibonacci(const int n) {
  if (n <= 1)
    return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Value;

// Wrapper function for the Fibonacci function
void Fibonacci(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();

  int value = args[0]->NumberValue(isolate->GetCurrentContext()).FromJust();
  int result = fibonacci(value);

  args.GetReturnValue().Set(Number::New(isolate, result));
}

// Initialize the module
void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "fibonacci", Fibonacci);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)