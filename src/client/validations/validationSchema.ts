import { z } from "zod";


export const textScheme = z.object({
  text: z.string().min(1, "Defina um ativo valida"),
  fromLang: z.enum(["pt", "en"]),
});
export type TextScheme = z.infer<
  typeof textScheme
>;
