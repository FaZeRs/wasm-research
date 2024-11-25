fn fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }
    fibonacci(n - 1) + fibonacci(n - 2)
}

fn main() {
    let n = std::env::var("FIBONACCI_N")
        .unwrap_or("40".to_string())
        .parse::<u32>()
        .unwrap();
    let result = fibonacci(n);
    println!("Fibonacci({}) = {}", n, result);
}
