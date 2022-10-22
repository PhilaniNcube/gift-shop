import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { Fragment, useState  } from 'react'
import {
  createBrowserSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from '../components/Navbar'
import { Database } from "../db_types";
import Footer from '../components/Footer';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';


function MyApp({ Component, pageProps }: AppProps) {
   const [supabaseClient] = useState(() =>
     createBrowserSupabaseClient<Database>()
   );
  const [queryClient] = React.useState(() => new QueryClient({}));


  return (
    <Fragment>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <QueryClientProvider client={queryClient}>
          <ShoppingCartProvider>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </ShoppingCartProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionContextProvider>
    </Fragment>
  );
}

export default MyApp
