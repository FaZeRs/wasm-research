import { visibilityGraph } from "@/lib/visibility_graph_napi";
import { NextRequest } from "next/server";

export const dynamic = "force-static";

export async function POST(request: NextRequest) {
  try {
    const { points, obstacles } = await request.json();
    const result = visibilityGraph.calculateVisibilityGraph(points, obstacles);
    return Response.json({ result });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
