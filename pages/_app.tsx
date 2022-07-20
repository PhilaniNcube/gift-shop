import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { Fragment, useEffect, useState } from 'react'
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from '../components/Navbar'
import supabase from '../lib/client';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient({}));





  return (
    <Fragment>
        <QueryClientProvider client={queryClient}>
      <UserProvider supabaseClient={supabaseClient}>
          <Navbar />
          <Component {...pageProps} />
          <ReactQueryDevtools />
      </UserProvider>
        </QueryClientProvider>
    </Fragment>
  );
}

export default MyApp
