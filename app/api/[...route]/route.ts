import { OpenAPIHono } from "@hono/zod-openapi";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new OpenAPIHono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Honofd!",
  });
});

export const GET = handle(app);
