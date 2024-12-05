interface Point {
  x: number;
  y: number;
}

export function calculateVisibilityGraph(
  points: Point[],
  obstacles: Point[][]
): boolean[][] {
  const n = points.length;
  const graph: boolean[][] = Array(n)
    .fill(null)
    .map(() => Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (!isLineIntersectingObstacles(points[i], points[j], obstacles)) {
        graph[i][j] = true;
        graph[j][i] = true;
      }
    }
  }

  return graph;
}

function isLineIntersectingObstacles(
  p1: Point,
  p2: Point,
  obstacles: Point[][]
): boolean {
  return obstacles.some((obstacle) => {
    for (let i = 0; i < obstacle.length; i++) {
      const j = (i + 1) % obstacle.length;
      if (linesIntersect(p1, p2, obstacle[i], obstacle[j])) {
        return true;
      }
    }
    return false;
  });
}

function linesIntersect(p1: Point, p2: Point, p3: Point, p4: Point): boolean {
  const d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
  if (d === 0) return false;

  const t = ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
  const u = ((p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x)) / d;

  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}
