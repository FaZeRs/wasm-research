include ../.env
export

build:
	emcc fibonacci.cpp -sEXPORTED_FUNCTIONS=_fibonacci_wrapper -sEXPORTED_RUNTIME_METHODS=ccall -o fibonacci.js --emit-tsd interface.d.ts -O3 -std=c++23 -sENVIRONMENT=node
run:
	$(shell command -v node) index.js
benchmark:
	perf stat -r 10 -o perf.txt -d $(shell command -v node) index.js
