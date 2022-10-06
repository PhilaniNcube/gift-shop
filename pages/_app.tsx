import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { Fragment, useEffect, useState } from 'react'
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from '../components/Navbar'
import supabase from '../lib/client';
import Footer from '../components/Footer';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';


function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient({}));


  return (
    <Fragment>
      <UserProvider supabaseClient={supabaseClient}>
        <QueryClientProvider client={queryClient}>
          <ShoppingCartProvider>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </ShoppingCartProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserProvider>
    </Fragment>
  );
}

export default MyApp
