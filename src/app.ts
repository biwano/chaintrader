import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";

const app = new OpenAPIHono();

app.get("/", (c) => {
  return c.json({ message: "Congrats! You've deployed Hono to Vercel" });
});
app.use("/*", cors());

export default app;
