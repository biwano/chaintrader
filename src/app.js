import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
const app = new OpenAPIHono();
app.use("/*", cors());
app.get("/", (c) => c.json({ app: "chaintrader", version: "0.1" }));
export default app;
