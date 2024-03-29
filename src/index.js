import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClient as Teste, QueryClientProvider as QueryTeste } from "react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();
const queryClientTeste = new Teste();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <QueryClientProvider client={queryClient}>
    <QueryTeste client={queryClientTeste}>
      <App/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryTeste>
    </QueryClientProvider>
);
{/* <React.StrictMode > */}
/* </React.StrictMode> */

