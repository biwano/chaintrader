import { serve } from "@hono/node-server";
import app from "../src/configuredApp";

const port = 3001;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
