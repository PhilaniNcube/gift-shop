import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useUser } from "@supabase/auth-helpers-react";
import { Fragment } from 'react';
import HeroSection from '../components/HomePage/HeroSection';


const Home: NextPage = () => {

     const { isLoading, user, error } = useUser();
     console.log({ user, error });



  return (
    <Fragment>
      <Head>
        <title>Gift Shop</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <HeroSection />



    </Fragment>
  )
}

export default Home
