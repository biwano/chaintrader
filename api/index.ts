import { handle } from "hono/vercel";

import app from "./app.js";
import "./routes/index.js";

app.get("/", (c) => {
  return c.json({ message: "Congrats! You've deployed Hono to Vercel0" });
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
