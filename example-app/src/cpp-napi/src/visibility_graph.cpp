#include <cmath>
#include <napi.h>
#include <vector>

struct Point {
  float x;
  float y;
};

bool linesIntersect(const Point &p1, const Point &p2, const Point &p3,
                    const Point &p4) {
  const float d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
  if (std::abs(d) < 1e-6f)
    return false;

  const float t =
      ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
  const float u =
      ((p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x)) / d;

  return t >= 0.0f && t <= 1.0f && u >= 0.0f && u <= 1.0f;
}

bool isLineIntersectingObstacles(
    const Point &p1, const Point &p2,
    const std::vector<std::vector<Point>> &obstacles) {
  for (const auto &obstacle : obstacles) {
    for (size_t i = 0; i < obstacle.size(); i++) {
      size_t j = (i + 1) % obstacle.size();
      if (linesIntersect(p1, p2, obstacle[i], obstacle[j])) {
        return true;
      }
    }
  }
  return false;
}

std::vector<std::vector<uint8_t>>
calculateVisibilityGraph(const std::vector<Point> &points,
                         const std::vector<std::vector<Point>> &obstacles) {
  const size_t n = points.size();
  std::vector<std::vector<uint8_t>> graph(n, std::vector<uint8_t>(n, 0));

  for (size_t i = 0; i < n; i++) {
    for (size_t j = i + 1; j < n; j++) {
      if (!isLineIntersectingObstacles(points[i], points[j], obstacles)) {
        graph[i][j] = 1;
        graph[j][i] = 1;
      }
    }
  }

  return graph;
}

Napi::Value calculateVisibilityGraphNapi(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  if (info.Length() < 2) {
    Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[0].IsArray() || !info[1].IsArray()) {
    Napi::TypeError::New(env, "Arguments must be arrays")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  Napi::Array points_val = info[0].As<Napi::Array>();
  Napi::Array obstacles_val = info[1].As<Napi::Array>();

  const size_t points_length = points_val.Length();
  const size_t obstacles_length = obstacles_val.Length();

  std::vector<Point> points(points_length);
  std::vector<std::vector<Point>> obstacles(obstacles_length);

  for (size_t i = 0; i < points_length; i++) {
    Napi::Object point = points_val.Get(i).As<Napi::Object>();
    points[i] = {point.Get("x").As<Napi::Number>().FloatValue(),
                 point.Get("y").As<Napi::Number>().FloatValue()};
  }

  for (size_t i = 0; i < obstacles_length; i++) {
    Napi::Array obstacle = obstacles_val.Get(i).As<Napi::Array>();
    const size_t obstacle_length = obstacle.Length();
    obstacles[i].resize(obstacle_length);

    for (size_t j = 0; j < obstacle_length; j++) {
      Napi::Object point = obstacle.Get(j).As<Napi::Object>();
      obstacles[i][j] = {point.Get("x").As<Napi::Number>().FloatValue(),
                         point.Get("y").As<Napi::Number>().FloatValue()};
    }
  }

  const auto graph = calculateVisibilityGraph(points, obstacles);

  Napi::Array result = Napi::Array::New(env, graph.size());

  for (size_t i = 0; i < graph.size(); i++) {
    const auto &row = graph[i];
    auto row_array = Napi::Uint8Array::New(env, row.size());
    for (size_t j = 0; j < row.size(); j++) {
      row_array[j] = row[j];
    }
    result.Set(i, row_array);
  }

  return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("calculateVisibilityGraph",
              Napi::Function::New(env, calculateVisibilityGraphNapi));
  return exports;
}

NODE_API_MODULE(visibility_graph, Init)