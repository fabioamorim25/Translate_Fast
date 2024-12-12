// import { getUserData } from "../../utils/localContextData";

import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { FormTranslate } from "../../components/formTranslate";

export function Dashboard() {
  // const {data} = trpc.ver.useQuery()
  // const { userId } = getUserData();
  // if (!userId) {
  //   console.log("O id do User não existe");
  //   return;
  // }

  return (
    <div className="text-center">
      <Header />
      {/* <Link to="/">Rota secundaria</Link> */}

      <FormTranslate />
    </div>
  );
}
