/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChevronRightIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/future/image";
import Link from "next/link";
import { Fragment } from "react";
import { useQuery } from "react-query";
import { getFeaturedProducts } from "../../fetchers/products";
import formatCurrency from "../../lib/formatCurrency";


const NewArrivals = () => {

  const {data:new_arrivals, isLoading, isSuccess} = useQuery(['featured_products'], getFeaturedProducts)

  return (
    <section className="my-6 md:my-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-slate-800 text-md sm:text-2xl md:text-3xl font-bold">
            New Arrivals
          </h2>
          <Link href="/products">
            <a className="flex items-center space-x-4 text-primary-main text-md md:text-lg">
              <span className="font-bold">View All</span>
              <ChevronRightIcon className="h-4 w-4 md:h-8 md:w-8" />
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 mt-4 gap-y-4">
          {new_arrivals?.map((product) => (
            <div key={product.id} className="w-full cursor-pointer">
              <Link href={`/products/${product.slug}`}>
                <Fragment>
                  <Image
                    alt={product.name}
                    src={product.main_image}
                    width={500}
                    height={500}
                    className="w-full shadow aspect-square object-cover rounded-lg"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <h3 className="text-md md:text-lg text-slate-800 font-bold">
                      {product.name}
                    </h3>
                    <HeartIcon className="h-4 w-4 md:h-6 md:w-6 text-primary-main" />
                  </div>
                  <p className="text-xs md:text-sm text-slate-500 mt-1 font-bold">
                    {product.details}
                  </p>
                  <h4 className="text-xl font-bold text-slate-800 mt-2">
                    {formatCurrency(product.price)}
                  </h4>
                </Fragment>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default NewArrivals;
