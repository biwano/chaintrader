import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
const app = new OpenAPIHono().basePath("/api");
app.use("/*", cors());
export default app;
