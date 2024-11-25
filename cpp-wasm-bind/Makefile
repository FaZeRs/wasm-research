include ../.env
export

build:
	emcc -lembind fibonacci.cpp -o fibonacci.js --emit-tsd interface.d.ts -O3 -std=c++23 -sENVIRONMENT=node
run:
	$(shell command -v node) index.js
benchmark:
	perf stat -r 10 -o perf.txt -d $(shell command -v node) index.js
