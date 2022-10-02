import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react';
import { useQuery } from 'react-query';
import Collections from '../components/HomePage/Collections';
import Handcrafted from '../components/HomePage/Handcrafted';
import Hero from '../components/HomePage/Hero';
import NewArrivals from '../components/HomePage/NewArrivals';
import { getProducts } from '../fetchers/products';



const Home: NextPage = () => {

const {data, isLoading, isSuccess} = useQuery(['products'], getProducts)


  return (
    <Fragment>
      <Head>
        <title>Gift Shop</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Hero />
      <NewArrivals />
      <Collections />
      <Handcrafted />
    </Fragment>
  )
}

export default Home
