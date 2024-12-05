import {
  MainModule,
  VectorPoint,
  VectorVectorInt,
  VectorVectorPoint,
} from "@/cpp-wasm/interface";

interface Point {
  x: number;
  y: number;
}

class WasmVectors {
  wasmPoints: VectorPoint;
  wasmObstacles: VectorVectorPoint;

  constructor(module: MainModule) {
    this.wasmPoints = new module.VectorPoint();
    this.wasmObstacles = new module.VectorVectorPoint();
  }

  updatePoints(points: Point[]) {
    this.wasmPoints.resize(points.length, { x: 0, y: 0 });
    points.forEach((p, i) => this.wasmPoints.set(i, { x: p.x, y: p.y }));
  }

  updateObstacles(obstacles: Point[][]) {
    this.wasmObstacles.resize(obstacles.length, new wasmModule!.VectorPoint());
    obstacles.forEach((obstacle, i) => {
      const wasmObstacle = this.wasmObstacles.get(i);
      if (!wasmObstacle) {
        throw new Error("WASM obstacle not found");
      }
      wasmObstacle.resize(obstacle.length, { x: 0, y: 0 });
      obstacle.forEach((p, j) => wasmObstacle.set(j, { x: p.x, y: p.y }));
    });
  }

  cleanup() {
    this.wasmPoints.delete();
    this.wasmObstacles.delete();
  }
}

let wasmModule: MainModule | null = null;
let wasmVectors: WasmVectors | null = null;

export async function initWasm(): Promise<void> {
  console.log("Initializing WASM module");
  if (wasmModule) return;

  try {
    const createModule = (await import("@/cpp-wasm/visibility_graph")).default;
    wasmModule = await createModule();

    wasmVectors = new WasmVectors(wasmModule!);
    console.log("WASM module loaded successfully");
  } catch (error) {
    console.error("Failed to load WASM module:", error);
    throw error;
  }
}

export function calculateVisibilityGraphOne(
  points: Point[],
  obstacles: Point[][]
): boolean[][] {
  if (!wasmModule || !wasmVectors) {
    throw new Error("WASM module not initialized");
  }

  wasmVectors.updatePoints(points);
  wasmVectors.updateObstacles(obstacles);

  const result: VectorVectorInt = wasmModule.calculateVisibilityGraphV1(
    wasmVectors.wasmPoints,
    wasmVectors.wasmObstacles
  );

  const n = result.size();
  const tsResult = Array(n);
  for (let i = 0; i < n; i++) {
    const row = result.get(i)!;
    const rowSize = row.size();
    tsResult[i] = new Array(rowSize).fill(false);
    const currentRow = tsResult[i];
    for (let j = 0; j < rowSize; j++) {
      currentRow[j] = !!row.get(j);
    }
  }

  result.delete();

  return tsResult;
}

export function calculateVisibilityGraphTwo(
  points: Point[],
  obstacles: Point[][]
): boolean[][] {
  if (!wasmModule) {
    throw new Error("WASM module not initialized");
  }

  return wasmModule.calculateVisibilityGraphV2(points, obstacles);
}

export function cleanup(): void {
  wasmVectors?.cleanup();
  wasmVectors = null;
}
