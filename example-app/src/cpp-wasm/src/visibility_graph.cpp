#include <cmath>
#include <emscripten/bind.h>
#include <emscripten/val.h>
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

emscripten::val
calculateVisibilityGraphV2(const emscripten::val &points_val,
                           const emscripten::val &obstacles_val) {
  const size_t points_length = points_val["length"].as<size_t>();
  const size_t obstacles_length = obstacles_val["length"].as<size_t>();

  std::vector<Point> points(points_length);
  std::vector<std::vector<Point>> obstacles(obstacles_length);

  for (size_t i = 0; i < points_length; i++) {
    const auto point = points_val[i];
    points[i] = {point["x"].as<float>(), point["y"].as<float>()};
  }

  for (size_t i = 0; i < obstacles_length; i++) {
    const auto obstacle = obstacles_val[i];
    const size_t obstacle_length = obstacle["length"].as<size_t>();

    obstacles[i].resize(obstacle_length);

    for (size_t j = 0; j < obstacle_length; j++) {
      const auto point = obstacle[j];
      obstacles[i][j] = {point["x"].as<float>(), point["y"].as<float>()};
    }
  }

  const auto graph = calculateVisibilityGraph(points, obstacles);

  auto result = emscripten::val::array();
  result.set("length", graph.size());

  for (size_t i = 0; i < graph.size(); i++) {
    const auto &row = graph[i];
    auto row_array = emscripten::val::array();
    row_array.set("length", row.size());

    auto typed_array = emscripten::val::global("Uint8Array").new_(row.size());
    typed_array.call<void>("set", emscripten::val::array(row));
    result.set(i, typed_array);
  }

  return result;
}

EMSCRIPTEN_BINDINGS(visibility_graph) {
  emscripten::value_object<Point>("Point")
      .field("x", &Point::x)
      .field("y", &Point::y);

  emscripten::register_vector<Point>("VectorPoint");
  emscripten::register_vector<std::vector<Point>>("VectorVectorPoint");
  emscripten::register_vector<uint8_t>("VectorInt");
  emscripten::register_vector<std::vector<uint8_t>>("VectorVectorInt");

  emscripten::function("calculateVisibilityGraphV1", &calculateVisibilityGraph);
  emscripten::function("calculateVisibilityGraphV2",
                       &calculateVisibilityGraphV2);
}