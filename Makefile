build-all:
	make -C cpp build
	make -C cpp-wasm build
	make -C cpp-wasm-bind build
	make -C cpp-wasm-ccall build
	make -C napi build
	make -C node-addon build
	make -C node-api build
	make -C rust build
	make -C rust-wasm build
benchmark:
	make -C cpp benchmark
	make -C cpp-wasm benchmark
	make -C cpp-wasm-bind benchmark
	make -C cpp-wasm-ccall benchmark
	make -C napi benchmark
	make -C node-addon benchmark
	make -C node-api benchmark
	make -C nodejs benchmark
	make -C bun benchmark
	make -C deno benchmark
	make -C rust benchmark
	make -C rust-wasm benchmark