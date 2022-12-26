/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChevronRightIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBundles } from "../../fetchers/bundles";
import { getFeaturedProducts } from "../../fetchers/products";
import formatCurrency from "../../lib/formatCurrency";


const NewArrivals = () => {

     const {
       data: bundles,
       isLoading,
       isSuccess,
     } = useQuery(["bundles"], getBundles);

  const router = useRouter()

  return (
    <section className="my-6 md:my-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-slate-800 text-md sm:text-2xl md:text-3xl font-bold">
            New Arrivals
          </h2>
          <Link
            href="/bundles"
            className="flex items-center space-x-4 text-primary-main text-md md:text-lg"
          >
            <span className="font-bold">View All</span>
            <ChevronRightIcon className="h-4 w-4 md:h-8 md:w-8" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 mt-4 gap-y-4">
          {bundles?.map((product) => (
            <Link
              href={`/bundles/${product.slug}`}
              key={product.id}
              className="w-full cursor-pointer"
            >
              <Fragment>
                <Image
                  alt={product.title}
                  src={product.main_image.url}
                  width={500}
                  height={500}
                  className="w-full shadow aspect-square object-cover rounded-lg"
                />
                <div className="flex justify-between items-center mt-2">
                  <h3 className="text-md md:text-lg text-slate-800 font-bold">
                    {product.title}
                  </h3>
                  <HeartIcon className="h-4 w-4 md:h-6 md:w-6 text-primary-main" />
                </div>
                <p className="text-xs md:text-sm text-slate-500 mt-1 font-bold">
                  {product.title}
                </p>
                <h4 className="text-xl font-bold text-slate-800 mt-2">
                  {formatCurrency(product.price)}
                </h4>
              </Fragment>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default NewArrivals;
