"use server";

import { calculateVisibilityGraph } from "@/lib/visibility_graph";
import {
  initWasm,
  cleanup,
  calculateVisibilityGraphOne as wasmCalculateVisibilityGraphOne,
  calculateVisibilityGraphTwo as wasmCalculateVisibilityGraphTwo,
} from "@/lib/visibility_graph_wasm";
import { visibilityGraph as napiVisibilityGraph } from "@/lib/visibility_graph_napi";

let isWasmInitialized = false;

async function ensureWasmInitialized() {
  if (!isWasmInitialized) {
    try {
      await initWasm();
      isWasmInitialized = true;
    } catch (error) {
      console.error("Failed to initialize WASM:", error);
      throw new Error("WASM initialization failed");
    }
  }
}

export async function runBenchmark() {
  console.log("Running benchmark...");
  await ensureWasmInitialized();
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
  napiVisibilityGraph.calculateVisibilityGraph(points, obstacles);
  console.timeEnd("NAPI");
}

if (typeof process !== "undefined") {
  process.on("beforeExit", () => {
    if (isWasmInitialized) {
      cleanup();
      isWasmInitialized = false;
    }
  });
}
