// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
declare namespace RuntimeExports {
    let HEAPF32: any;
    let HEAPF64: any;
    let HEAP_DATA_VIEW: any;
    let HEAP8: any;
    let HEAPU8: any;
    let HEAP16: any;
    let HEAPU16: any;
    let HEAP32: any;
    let HEAPU32: any;
    let HEAP64: any;
    let HEAPU64: any;
}
interface WasmModule {
}

export interface ClassHandle {
  isAliasOf(other: ClassHandle): boolean;
  delete(): void;
  deleteLater(): this;
  isDeleted(): boolean;
  clone(): this;
}
export interface VectorPoint extends ClassHandle {
  size(): number;
  get(_0: number): Point | undefined;
  push_back(_0: Point): void;
  resize(_0: number, _1: Point): void;
  set(_0: number, _1: Point): boolean;
}

export interface VectorVectorPoint extends ClassHandle {
  push_back(_0: VectorPoint): void;
  resize(_0: number, _1: VectorPoint): void;
  size(): number;
  get(_0: number): VectorPoint | undefined;
  set(_0: number, _1: VectorPoint): boolean;
}

export interface VectorInt extends ClassHandle {
  push_back(_0: number): void;
  resize(_0: number, _1: number): void;
  size(): number;
  get(_0: number): number | undefined;
  set(_0: number, _1: number): boolean;
}

export interface VectorVectorInt extends ClassHandle {
  push_back(_0: VectorInt): void;
  resize(_0: number, _1: VectorInt): void;
  size(): number;
  get(_0: number): VectorInt | undefined;
  set(_0: number, _1: VectorInt): boolean;
}

export type Point = {
  x: number,
  y: number
};

interface EmbindModule {
  VectorPoint: {
    new(): VectorPoint;
  };
  VectorVectorPoint: {
    new(): VectorVectorPoint;
  };
  VectorInt: {
    new(): VectorInt;
  };
  VectorVectorInt: {
    new(): VectorVectorInt;
  };
  calculateVisibilityGraphV1(_0: VectorPoint, _1: VectorVectorPoint): VectorVectorInt;
  calculateVisibilityGraphV2(_0: any, _1: any): any;
}

export type MainModule = WasmModule & typeof RuntimeExports & EmbindModule;
export default function MainModuleFactory (options?: unknown): Promise<MainModule>;
