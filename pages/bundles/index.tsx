import { ChevronRightIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import ProductsBanner from "../../components/Banner/ProductsBanner";
import BundleFilter from "../../components/Filter/BundleFilter";
import { countBundles, getBundles } from "../../fetchers/bundles";
import formatCurrency from "../../lib/formatCurrency";

const Products = ({ bundles, count }: { bundles: IBundle[], count:number }) => {

  console.log("count ",count)
  console.log({ bundles: bundles });

  return (
    <Fragment>
      <Head>Products | ATG</Head>
      <ProductsBanner />
      <main className="py-4">
        <section className="max-w-7xl mx-auto px-4">
          <span className="flex items-center space-x-3">
            <Link
              href="/"
              className="text-primary-main text-md md:text-xl cursor-pointer font-bold"
            >
              Home
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
            <BundleFilter />
          </aside>{" "}
          <div className="flex-1 col-span-4 md:col-span-3 ">
            <div className="flex justify-between items-center mb-2">
              <p className="text-primary-main text-md font-bold">
                Showing {count} items
              </p>
              {/* <p className="text-primary-main text-md font-bold">To Show 8</p> */}
              {/* <p className="text-primary-main text-md font-bold">
                Sort By Position
              </p> */}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {bundles.map((bundle) => (
                <Link key={bundle.id} href={`/bundles/${bundle.slug}`}>
                  <div className="w-full group cursor-pointer">
                    <Image
                      src={bundle.main_image.url}
                      height={1000}
                      width={1000}
                      alt={bundle.title}
                      className="w-full object-cover group-hover:opacity-90 aspect-square rounded-lg shadow-lg"
                    />
                    <span className="w-full mt-2 flex justify-between items-center">
                      <h3 className="text-md font-bold text-primary-main">
                        {bundle.title}
                      </h3>
                      <HeartIcon className="h-6 w-6 text-primary-main" />
                    </span>
                    <p className="mt-1 text-xs text-slate-600 font-medium flex space-x-1">
                      {bundle.description}
                    </p>
                    <h2 className="text-2xl text-primary-main font-bold">
                      {formatCurrency(bundle.price)}
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




export const getServerSideProps = async () => {

  const bundles = await getBundles() as IBundle[];

 const count = await countBundles();

  return {
    props: {
      bundles: bundles,
      count,

    },

  };
};
