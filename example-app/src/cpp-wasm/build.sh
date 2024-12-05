#!/bin/bash

emcc src/visibility_graph.cpp \
  -o visibility_graph.js \
  -s WASM=1 \
  -s SINGLE_FILE=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s NO_EXIT_RUNTIME=1 \
  -s MODULARIZE=1 \
  -s EXPORT_ES6=1 \
  -s USE_ES6_IMPORT_META=0 \
  -s ENVIRONMENT=web \
  -s EXPORT_NAME='createModule' \
  -s ASSERTIONS=0 \
  -s FILESYSTEM=0 \
  -O3 \
  -std=c++23 \
  --bind \
  --emit-tsd interface.d.ts \
  -flto \
  -fno-rtti \
  -fno-exceptions \
  -DEMSCRIPTEN_HAS_UNBOUND_TYPE_NAMES=0 \
  --closure 1 \
  -ffast-math \
  -mnontrapping-fptoint \
  -mreference-types \
  -mbulk-memory
