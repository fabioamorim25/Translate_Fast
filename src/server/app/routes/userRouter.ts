import { z } from "zod";
import { initTRPC } from "@trpc/server";
import { controllerCreateUser } from "../controllers/user_controller";

const t = initTRPC.create();

export const userRouter = t.router({
  userCreate: t.procedure
      //validar dados de entrada
      .input(
        z.object({
          name: z
            .string({ required_error: "O nome é obrigatorio" })
            .min(1, "O nome é obrigatorio"),
          password: z.string().optional(),
        })
      )
      //ação a ser realizada
      .mutation(async ({ input: { name, password } }) => {
        return controllerCreateUser({ name, password });
      }),
});
