import { translate } from "@vitalets/google-translate-api";

type Text = {
  text: string | null;
  fromLang: "pt" | "en";
};

export async function controllerTranslate({ text, fromLang }: Text) {
  try {
    if (!text) text = "hello word";

    const translatedText = await translate(text, { to: fromLang });
    return translatedText.text;
  } catch (error) {
    return error;
  }
}
