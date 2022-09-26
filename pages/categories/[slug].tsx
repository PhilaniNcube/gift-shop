import { ChevronRightIcon } from '@heroicons/react/outline';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/future/image';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';
import Filter from '../../components/Filter';
import categories from '../../data/categories'

interface ICategory {
  id:number,
  slug:string,
  name:string,
  image:string,
  width:number,
  height:number
}

export default function Category({ category }: { category:ICategory }) {
  console.log(category);
  return (
    <Fragment>
      <Head>
        <title>{category.name} | Gifts</title>
      </Head>{" "}
      <header className="max-w-7xl mx-auto relative my-12 isolate">
        <Image
          src={category.image}
          width={category.width}
          height={category.height}
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
              <p className="text-primary-main text-md font-bold">Showing 1 - 12 of 50 items</p>
              <p className="text-primary-main text-md font-bold">To Show 8</p>
              <p className="text-primary-main text-md font-bold">Sort By Position</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3"></div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};





export const getStaticPaths = () =>{

  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));

  console.log({paths})

return {
 paths ,
 fallback: 'blocking'
}

}


export const getStaticProps = ({params: {slug}}: {params: {slug: string}}) => {

  const category = categories.filter(c => c.slug === slug)

  return {
    props: {
      category: category[0]
    },
    revalidate: 10
  }

}
