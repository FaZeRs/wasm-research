build:
	emcc fibonacci.cpp -sEXPORTED_FUNCTIONS=_fibonacci_wrapper -sEXPORTED_RUNTIME_METHODS=ccall -o fibonacci.js -O3 -std=c++23 -sENVIRONMENT=node
run:
	node index.js
benchmark:
	perf stat -r 10 -o perf.txt -d node index.js
