import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.json({ message: "Congrats! You've deployed Hono to Vercel0" });
});

const port = 3001;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
