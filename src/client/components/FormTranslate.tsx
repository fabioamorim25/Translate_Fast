import { trpc } from "../util";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextScheme, textScheme } from "../validations/validationSchema";
import { TranslatedResult } from "./TranslatedResult";

export function FormTranslate() {
  const { register, watch, setValue, handleSubmit, reset } =
    useForm<TextScheme>({
      resolver: zodResolver(textScheme),
    });

  const language = ["pt", "en"];
  const fromLang = watch("fromLang");
  const [result, setResult] = useState("");

  const mutation = trpc.translate.textQuery.useMutation({
    onSuccess: (newdata: any) => {
      console.log(newdata);
      return setResult(newdata);
    },
    onError: (error) => {
      console.error("Erro:", error);
    },
  });

  const onRegister = (data: TextScheme) => {
    mutation.mutate({
      text: data.text,
      fromLang: data.fromLang,
    });
    //   reset(); // Limpa os campos
  };
  const isLanguage = (item: "pt" | "en") => {
    setValue("fromLang", item);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-max p-1 border rounded bg-black-70">
        <h1 className="text-whait-50 text-center text-lg font-bold mb-1">
          Traduzir Dados
        </h1>
        <form onSubmit={handleSubmit(onRegister)}>
          <div className="mx-2 mt-4">
            <textarea
              placeholder="Digite o texto a ser traduzido"
              maxLength={100}
              {...register("text")}
              className="max-h-10 w-full text-[11px] border rounded-md focus:outline-none bg-black-80 text-black-10"
            />

            <div className="flex items-center">
              <p className="text-whait-50 text-[10px]">Linguagem desejada</p>
              {language.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className={`px-2 m-0.5 text-black-80 rounded ${
                    fromLang == item ? "bg-purple-600" : "bg-purple-900"
                  }`}
                  onClick={() => isLanguage(item as "pt" | "en")}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="m-2 p-1 w-1/2 bg-green-800 hover:bg-green-900 rounded-lg text-whait-50 text-xs"
              disabled={mutation.isPending}
            >
              <span className="flex items-center justify-center">Criar</span>
            </button>
          </div>
        </form>

        {result && <TranslatedResult data={result} />}
      </div>
    </div>
  );
}
