import re
import matplotlib.pyplot as plt

# Function to parse perf output
def parse_perf_output(file_path):
    metrics = {}
    with open(file_path) as file:
        for line in file:
            if 'task-clock' in line:
                match = re.search(r'([\d\.,]+) msec task-clock', line)
                if match:
                    metrics['task-clock'] = float(match.group(1).replace(',', '')) / 1000.0
            else:
                match = re.match(r'\s*([\d,]+)\s+([\w\s]+)', line)
                if match:
                    value, metric = match.groups()
                    value = int(value.replace(',', ''))
                    metrics[metric.strip()] = value

    return metrics

# Parse the output files
cpp_metrics = parse_perf_output('./cpp/perf.txt')
cpp_wasm_metrics = parse_perf_output('./cpp-wasm/perf.txt')
cpp_wasm_bind_metrics = parse_perf_output('./cpp-wasm-bind/perf.txt')
cpp_wasm_ccall_metrics = parse_perf_output('./cpp-wasm-ccall/perf.txt')
napi_metrics = parse_perf_output('./napi/perf.txt')
node_addon_metrics = parse_perf_output('./node-addon/perf.txt')
node_api_metrics = parse_perf_output('./node-api/perf.txt')
node_metrics = parse_perf_output('./nodejs/perf.txt')
bun_metrics = parse_perf_output('./bun/perf.txt')
rust_metrics = parse_perf_output('./rust/perf.txt')
rust_wasm_metrics = parse_perf_output('./rust-wasm/perf.txt')

# Collect metrics for all benchmarks
benchmarks = {
    'cpp': cpp_metrics,
    'rust': rust_metrics,
    'cpp-wasm': cpp_wasm_metrics,
    'cpp-wasm-bind': cpp_wasm_bind_metrics,
    'cpp-wasm-ccall': cpp_wasm_ccall_metrics,
    'rust-wasm': rust_wasm_metrics,
    'napi': napi_metrics,
    'node-addon': node_addon_metrics,
    'node-api': node_api_metrics,
    'node': node_metrics,
    'bun': bun_metrics,
}

# Metrics to plot
metrics_to_plot = ['cycles', 'instructions', 'task-clock']

# Prepare data for plotting
data = {metric: [] for metric in metrics_to_plot}
benchmark_names = []

for benchmark_name, metrics in benchmarks.items():
    benchmark_names.append(benchmark_name)
    for metric in metrics_to_plot:
        data[metric].append(metrics.get(metric, 0))

# Plot the data
# fig, ax = plt.subplots(len(metrics_to_plot), 1, figsize=(10, 15))

for i, metric in enumerate(metrics_to_plot):
    plt.figure(figsize=(8, 6))
    plt.bar(benchmark_names, data[metric])
    plt.title(metric)
    plt.ylabel('Count' if metric not in ['task-clock'] else 'Seconds')
    plt.xlabel('Benchmark')
    plt.tight_layout()
    plt.show()
