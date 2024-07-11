build:
	emcc -lembind fibonacci.cpp -o fibonacci.js --emit-tsd interface.d.ts -O3 -std=c++23 -sENVIRONMENT=node
run:
	node index.js
benchmark:
	perf stat -r 10 -o perf.txt -d node index.js
