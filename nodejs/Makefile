include ../.env
export

run:
	$(shell command -v node) index.js
benchmark:
	perf stat -r 10 -o perf.txt -d $(shell command -v node) index.js