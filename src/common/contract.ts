import { initContract } from "@ts-rest/core";
import { z } from "zod";

export const contract = initContract().router(
    {
        input: {
            method: "GET",
            path: "/events/:event/puzzles/:puzzle/input",
            pathParams: z.object({
                event: z.string(),
                puzzle: z.string()
            }),
            responses: {
                200: z.undefined()
            }
        }
    },
    {
        strictStatusCodes: true
    }
);
