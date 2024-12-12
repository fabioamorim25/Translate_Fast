import { z } from "zod";
import { initTRPC } from "@trpc/server";
import { controllerTranslate } from "../controllers/translate_controller";

const t = initTRPC.create();

export const translateRouter = t.router({
  textQuery: t.procedure
    // Validação dos dados de entrada
    .input(
      z.object({
        text: z
          .string({ required_error: "O texto é obrigatório" })
          .min(1, "O texto é obrigatório"),
        fromLang: z.enum(["pt", "en"]).default("pt"),
      })
    )
    // Ação a ser realizada
    .mutation(async ({ input: { text, fromLang } }) => {
      const result = await controllerTranslate({ text, fromLang });

      console.log("Resultado da tradução:", result);

      return result;
    }),
});
