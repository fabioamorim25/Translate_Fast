import { initTRPC } from "@trpc/server";

const fixESM = require("fix-esm");
import type SuperJSON from "superjson";
const superjson: SuperJSON = fixESM.require("superjson");

import { userRouter } from "./userRouter";


//1.iniciar o trpc
const t = initTRPC.create({
  transformer: superjson,
});

//2.DEFINIR AS ROTAS DO SISTEMA
export const appRouter = t.router({
  user: userRouter, // Sub-rota para usuários

});

export type AppRouter = typeof appRouter;
