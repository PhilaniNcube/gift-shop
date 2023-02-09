import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment, useState  } from 'react'
import {
  createBrowserSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

// import Navbar from '../components/Navbar'
import { Database } from "../db_types";
import Footer from '../components/Footer';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navigation from '../components/Navigation';


function MyApp({ Component, pageProps }: AppProps) {
   const [supabaseClient] = useState(() =>
     createBrowserSupabaseClient<Database>()
   );
  const [queryClient] = useState(() => new QueryClient({}));


  return (
    <Fragment>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ShoppingCartProvider>
              <Navigation />
              <Component {...pageProps} />
              <Footer />
            </ShoppingCartProvider>
            <ReactQueryDevtools />
          </Hydrate>
        </QueryClientProvider>
      </SessionContextProvider>
    </Fragment>
  );
}

export default MyApp
