import { initServer } from "@ts-rest/express";
import { contract } from "../common/contract";

export function initRouter() {
    return initServer().router(contract, {
        async input({ params, res }) {
            res.setHeader("content-type", "text/plain");
            res.removeHeader("connection");
            res.send("3\n35\n0\n23\n".repeat(1000));
            return { status: 200, body: undefined };
        }
    });
}
