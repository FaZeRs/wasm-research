#include <node_api.h>

int fibonacci(const int n) {
  if (n <= 1)
    return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

napi_value FibonacciWrapped(napi_env env, napi_callback_info info) {
  size_t argc = 1;
  napi_value args[1];
  napi_value this_arg;
  napi_get_cb_info(env, info, &argc, args, &this_arg, nullptr);

  int n;
  napi_get_value_int32(env, args[0], &n);

  int result = fibonacci(n);

  napi_value result_napi;
  napi_create_int32(env, result, &result_napi);

  return result_napi;
}

napi_value Init(napi_env env, napi_value exports) {
  napi_value fn;
  napi_create_function(env, nullptr, 0, FibonacciWrapped, nullptr, &fn);
  napi_set_named_property(env, exports, "fibonacci", fn);
  return exports;
}

NAPI_MODULE(fibonacci, Init)