import { ChevronRightIcon, HeartIcon } from "@heroicons/react/outline";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import ProductsBanner from "../../components/Banner/ProductsBanner";
import Filter from "../../components/Filter";
import { getProducts } from "../../fetchers/products";
import formatCurrency from "../../lib/formatCurrency";



const Products = ({ products }: { products: IProduct[] }) => {


  return (
    <Fragment>
      <Head>Products | ATG</Head>
      <ProductsBanner />
      <main className="py-4">
        <section className="max-w-7xl mx-auto px-4">
          <span className="flex items-center space-x-3">
            <Link href="/">
              <a className="text-primary-main text-md md:text-xl cursor-pointer font-bold">
                Home
              </a>
            </Link>
            <ChevronRightIcon className="h-6 w-6 text-primary-main" />

            <p className="text-slate-500 text-md md:text-xl font-bold">
              Products
            </p>
          </span>
          <h1 className="text-3xl mt-3 font-bold text-primary-main">
            Our Products
          </h1>
        </section>
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 gap-6">
          <aside className="hidden md:flex flex-col col-span-1 w-full">
            <Filter />
          </aside>{" "}
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {products.map((product) => (
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
                    <p className="mt-1 text-xs text-slate-600 font-medium flex space-x-1">
                      {product.details}
                    </p>
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
  );
};
export default Products;




export const getStaticProps = async () => {

  const products = await getProducts() as IProduct[];

  return {
    props: {
      products: products,
    },
    revalidate: 10,
  };
};
