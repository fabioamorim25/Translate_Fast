import {createTRPCReact} from '@trpc/react-query';
import {AppRouter} from "../server/app/routes/router";//receber as rotas do back end

// TRABALHAR COM O TRPC NO FRONT END
export const trpc = createTRPCReact<AppRouter>();