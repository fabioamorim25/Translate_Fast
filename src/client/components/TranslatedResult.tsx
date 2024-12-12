type Data = {
  data: string;
};

export function TranslatedResult({ data }: Data) {
  if (!data.length) return;

  return (
    <div>
      <p>{data}</p>
    </div>
  );
}
