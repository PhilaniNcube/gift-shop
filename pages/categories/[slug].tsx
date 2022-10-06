import { ChevronRightIcon, HeartIcon } from '@heroicons/react/24/outline';

import Image from 'next/future/image';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';

import Filter from '../../components/Filter';
import {  getCategoryProducts } from '../../fetchers/products';
import supabase from '../../lib/client';
import formatCurrency from '../../lib/formatCurrency';




export default function Category({ category, products }: { category:ICategory, products: IProduct[] }) {



  return (
    <Fragment>
      <Head>
        <title>{category.name} | Gifts</title>
      </Head>{" "}
      <header className="max-w-7xl mx-auto relative my-12 isolate">
        <Image
          src={category.image.src}
          width={category.image.width}
          height={category.image.height}
          alt={category.name}
          className="w-full object-cover h-64 md:h-96 rounded-lg"
        />
        <div className="absolute inset-0 flex items-center p-8 bg-slate-300/40 rounded-lg">
          <h1 className="text-3xl md:text-5xl lg:text-[4rem] uppercase font-bold text-primary-main">
            {category.name}
          </h1>
        </div>
      </header>
      <main className="py-4">
        <section className="max-w-7xl mx-auto px-4">
          <span className="flex items-center space-x-3">
            <Link href="/">
              <a className="text-primary-main text-md md:text-xl cursor-pointer font-bold">
                Home
              </a>
            </Link>
            <ChevronRightIcon className="h-6 w-6 text-primary-main" />
            <Link href="/categories">
              <a className="text-primary-main text-md md:text-xl cursor-pointer font-bold">
                Categories
              </a>
            </Link>
            <ChevronRightIcon className="h-6 w-6 text-primary-main" />
            <p className="text-slate-500 text-md md:text-xl font-bold">
              {category.name}
            </p>
          </span>
          <h1 className="text-3xl mt-3 font-bold text-primary-main">
            {category.name}
          </h1>
        </section>
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 gap-3">
          <aside className="hidden md:flex flex-col col-span-1 w-full">
            <Filter />
          </aside>
          <div className="flex-1 col-span-4 md:col-span-3 ">
            <div className="flex justify-between items-center mb-2">
              <p className="text-primary-main text-md font-bold">
                Showing 1 - 12 of 50 items
              </p>
              <p className="text-primary-main text-md font-bold">To Show 8</p>
              <p className="text-primary-main text-md font-bold">
                Sort By Position
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6 md:gap-x-10 lg:gap-x-16">
              {products?.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <div className="w-full group cursor-pointer">
                    <Image
                      src={product.main_image}
                      height={1000}
                      width={1000}
                      alt={product.name}
                      className="w-full object-cover group-hover:opacity-90 aspect-square rounded-lg shadow-lg"
                    />
                    <span className="w-full mt-2 flex justify-between items-center">
                      <h3 className="text-md font-bold text-primary-main">
                        {product.name}
                      </h3>
                      <HeartIcon className="h-6 w-6 text-primary-main" />
                    </span>

                    <h2 className="text-2xl text-primary-main font-bold">
                      {formatCurrency(product.price)}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  )
}





export const getStaticPaths = async () =>{

    const { data: categories } = await supabase
      .from("categories")
      .select("*");



  const paths = categories?.map((category) => ({
    params: { slug: category.slug },
  }));

  console.log({paths})

return {
 paths ,
 fallback: 'blocking'
}

}


export const getStaticProps = async ({params: {slug}}: {params: {slug: string}}) => {

  const { data: categories } = await supabase
    .from("categories")
    .select("*");

  const category = categories?.filter(c => c.slug === slug) as ICategory[]

    const products = await getCategoryProducts(category[0].id) as IProduct[];

  return {
    props: {
      category: category[0],
      products: products
    },
    revalidate: 10
  }

}
