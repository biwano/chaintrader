import { z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
export const ResultSchema = z
    .object({
    result: z.string(),
})
    .openapi("Result");
export const schemaToResponse = (schema) => ({
    200: {
        content: {
            "application/json": {
                schema,
            },
        },
        description: "Retrieve information",
    },
});
export const makeError = (status, message) => {
    return new HTTPException(status, {
        res: new Response(JSON.stringify({ error: message }), {
            status,
        }),
    });
};
export const makeDBError = (error) => {
    return makeError(500, `${error.code} ${error.name} ${error.message} ${error.details}`);
};
