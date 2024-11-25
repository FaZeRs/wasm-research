include ../.env
export

run:
	deno --allow-env index.ts
benchmark:
	perf stat -r 10 -o perf.txt -d deno --allow-env index.ts