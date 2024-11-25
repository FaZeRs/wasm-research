include ../.env
export

run:
	bun index.ts
benchmark:
	perf stat -r 10 -o perf.txt -d bun index.ts