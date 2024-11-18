import { OpenAPIHono } from "@hono/zod-openapi";
import { handle } from "hono/vercel";

const app = new OpenAPIHono().basePath("/api");

app.get("/", (c) => {
  return c.json({ message: "Congrats! You've deployed Hono to Vercel0" });
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
