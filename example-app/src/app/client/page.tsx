"use client";

import { useEffect } from "react";

import { calculateVisibilityGraph } from "@/lib/visibility_graph";
import {
  initWasm,
  cleanup,
  calculateVisibilityGraphOne as wasmCalculateVisibilityGraphOne,
  calculateVisibilityGraphTwo as wasmCalculateVisibilityGraphTwo,
} from "@/lib/visibility_graph_wasm";

export default function Home() {
  useEffect(() => {
    initWasm();
    return () => {
      cleanup();
    };
  }, []);

  const runBenchmark = async () => {
    console.log("Running benchmark...");
    // Create test data: 1000 random points and 50 rectangular obstacles
    const points = Array(1000)
      .fill(null)
      .map(() => ({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
      }));

    const obstacles = Array(50)
      .fill(null)
      .map(() => {
        const x = Math.random() * 900;
        const y = Math.random() * 900;
        return [
          { x, y },
          { x: x + 100, y },
          { x: x + 100, y: y + 100 },
          { x, y: y + 100 },
        ];
      });

    // Benchmark TypeScript version
    console.time("TypeScript Version");
    calculateVisibilityGraph(points, obstacles);
    console.timeEnd("TypeScript Version");
    console.time("WASM v1");
    wasmCalculateVisibilityGraphOne(points, obstacles);
    console.timeEnd("WASM v1");
    console.time("WASM v2");
    wasmCalculateVisibilityGraphTwo(points, obstacles);
    console.timeEnd("WASM v2");
    console.time("NAPI");
    await fetch("/api/visibility-graph", {
      method: "POST",
      body: JSON.stringify({ points, obstacles }),
    });
    console.timeEnd("NAPI");
  };

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
