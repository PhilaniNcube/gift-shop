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

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient({}));





  return (
    <Fragment>
      <UserProvider supabaseClient={supabaseClient}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserProvider>
    </Fragment>
  );
}

export default MyApp
