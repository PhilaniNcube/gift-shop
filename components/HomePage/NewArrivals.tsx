import { ChevronRightIcon, HeartIcon } from "@heroicons/react/outline";
import Image from "next/future/image";
import Link from "next/link";
import { Fragment } from "react";
import formatCurrency from "../../lib/formatCurrency";

const arrivals = [
  {
    id: 1,
    name: "Oh So Heavenly",
    slug: "oh_so_heavenly",
    short_description: "Fragrant soap hamper",
    image: "/images/oh_so_heavenly.png",
    price: 349,
  },
  {
    id: 2,
    name: "Habano",
    slug: "habano",
    short_description: "Cigar & fishing tackle",
    image: "/images/habano_riverside.jpg",
    price: 899,
  },
  {
    id: 3,
    name: "CBD Oil",
    slug: "cbd_oil",
    short_description: "Blended CBD Oils",
    image: "/images/cbd_oil.jpg",
    price: 450,
  },
  {
    id: 4,
    name: "Hemp Soap",
    slug: "hemp_soap",
    short_description: "Hemp based natural soap",
    image: "/images/hemp_soap.jpg",
    price: 299,
  },
];

const NewArrivals = () => {
  return <section className="my-6 md:my-8">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center">
       <h2 className="text-slate-800 text-2xl md:text-3xl font-bold">New Arrivals</h2>
       <Link href="/products"><a className="flex items-center space-x-4 text-primary-main text-lg"><span className="font-bold">View All</span><ChevronRightIcon className="h-8 w-8" /></a></Link>
      </div>
      <div className="grid grid-cols-4 gap-x-8 mt-4 gap-y-4">
        {arrivals.map((product) => (
          <div key={product.id} className="w-full cursor-pointer">
           <Link href={`/products/${product.slug}`}>
           <Fragment>
             <Image alt={product.name} src={product.image} width={500} height={500} className="w-full shadow aspect-square object-cover rounded-lg" />
             <div className="flex justify-between mt-2">
              <h3 className="text-lg text-slate-800 font-bold">{product.name}</h3>
              <HeartIcon className="h-6 w-6 text-primary-main" />
             </div>
             <p className="text-sm text-slate-500 mt-1 font-bold">{product.short_description}</p>
             <h4 className="text-xl font-bold text-slate-800 mt-2">{formatCurrency(product.price)}</h4>
           </Fragment>
           </Link>
          </div>
        ))}
      </div>
    </div>
  </section>;
};
export default NewArrivals;
