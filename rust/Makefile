include ../.env
export

build:
	rustc -O --edition 2021 main.rs
run:
	./main
benchmark:
	perf stat -r 10 -o perf.txt -d ./main
