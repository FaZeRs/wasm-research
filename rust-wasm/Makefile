build:
	wasm-pack build --target nodejs
run:
	node index.js 
benchmark:
	perf stat -r 10 -o perf.txt -d node index.js
