import { swaggerUI } from "@hono/swagger-ui";
import app from "../app.js";

app.get("/", swaggerUI({ url: "/openapi.json" }));
