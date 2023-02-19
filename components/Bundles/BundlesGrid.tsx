import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Database } from "../../db_types";
import formatCurrency from "../../lib/formatCurrency";

type Bundle = Database["public"]['Tables']['bundles']['Row']

type Props = {
  bundles: Bundle[]
}

const BundlesGrid = ({bundles}:Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 mt-4 gap-y-4 my-10">
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
              <h3 className="text-md md:text-lg text-primary-main font-medium line-clamp-1">
                {product.title}
              </h3>

            </div>

            <h4 className="text-xl font-bold text-slate-800 mt-2">
              {formatCurrency(product.price)}
            </h4>
          </Fragment>
        </Link>
      ))}
    </div>
  );
};
export default BundlesGrid;
