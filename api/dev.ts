import { serve } from "@hono/node-server";

import app from "./app.js";
import "./routes/index.js";

app.get("/", (c) => {
  return c.json({ message: "Congrats! You've deployed Hono to Vercel0" });
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
