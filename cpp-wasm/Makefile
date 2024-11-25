include ../.env
export

build: 
	emcc main.cpp -o main.out.js --emit-tsd interface.d.ts -O3 -std=c++23 -sENVIRONMENT=node -sEXPORTED_RUNTIME_METHODS=ENV --pre-js=pre-run.js
run:
	$(shell command -v node) main.out.js
benchmark:
	perf stat -r 10 -o perf.txt -d $(shell command -v node) main.out.js
