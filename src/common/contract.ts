import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { ContractAnyType, ContractOtherResponse } from "@ts-rest/core/src/lib/dsl";

export const contract = initContract().router(
    {
        input: {
            method: "GET",
            path: "/api/adventures/:adventure/puzzles/:puzzle/input",
            pathParams: z.object({
                adventure: z.string(),
                puzzle: z.string()
            }),
            responses: {
                200: {
                    contentType: "text/plain",
                    body: z.string()
                } as unknown as ContractOtherResponse<ContractAnyType>
            }
        }
    },
    {
        strictStatusCodes: true
    }
);
