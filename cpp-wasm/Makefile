build: 
	emcc main.cpp -o main.out.js -O3 -std=c++23 -sENVIRONMENT=node
run:
	node main.out.js
benchmark:
	perf stat -r 10 -o perf.txt -d node main.out.js
