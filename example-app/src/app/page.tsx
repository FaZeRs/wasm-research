import { runBenchmark } from "@/lib/benchmark";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Floorplan Visibility Graph Benchmark</h1>
      <button
        onClick={runBenchmark}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Run Benchmark
      </button>
    </div>
  );
}
