import { useState } from "react";
import { trpc } from "./util";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IpcRequest } from "../api";
import superjson from "superjson";

import AppRoutes from "./routes/router";

export default function App() {
  
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
          },
        },
      })
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink(),
        httpBatchLink({
          url: "/trpc",

          // custom fetch implementation that sends the request over IPC to Main process
          fetch: async (input, init) => {
            const req: IpcRequest = {
              url:
                input instanceof URL
                  ? input.toString()
                  : typeof input === "string"
                  ? input
                  : input.url,
              method: input instanceof Request ? input.method : init?.method!,
              headers:
                input instanceof Request ? input.headers : init?.headers!,
              body: input instanceof Request ? input.body : init?.body!,
            };

            const resp = await window.appApi.trpc(req);
            // Since all tRPC really needs is the JSON, and we already have the JSON deserialized,
            // construct a "fake" fetch Response object
            return {
              json: () => Promise.resolve(resp.body),
            };
          },

          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
