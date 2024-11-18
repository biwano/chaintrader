import { serve } from "@hono/node-server";
import app from "../src/app";

const port = 3001;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
