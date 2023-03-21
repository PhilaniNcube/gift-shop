
import { Tab } from "@headlessui/react";

import Image from "next/image";
import { getBundleProducts } from "../../fetchers/bundles";
import { useQuery } from "@tanstack/react-query";

function classNames(...classes: string[]): string{
  return classes.filter(Boolean).join(" ");
}

export default function ProductTabs({product}: {product: IBundle}) {


   const { data, isLoading, isSuccess } = useQuery(
     ["bundle_products"],
     async () => getBundleProducts(product.id)
   );


  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 ">
      <Tab.Group>
        <Tab.List className="flex max-w-xl space-x-1 rounded-lg bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                "text-primary-main",
                selected
                  ? "bg-white shadow"
                  : "text-primary-main hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Product Description
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                "text-primary-main",
                selected
                  ? "bg-white shadow"
                  : "text-primary-main hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Products In Bundle
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "text-primary-main"
            )}
          >
            <p className="text-sm md:text-md text-primary-main font-bold md:max-w-3xl">
              {product.description}
            </p>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "text-primary-main"
            )}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {isLoading
                ? "Loading..."
                : isSuccess &&
                  data.map((product) => (
                    <div
                      // href={`/products/${product.product_id.slug}`}
                      key={product.product_id.id}
                      className="group flex flex-col justify-center"
                    >

                        <Image
                          src={product.product_id.main_image}
                          width={500}
                          height={500}
                          alt={product.product_id.name!}
                          className="w-full rounded-lg aspect-square group-hover:opacity-60 cursor-pointer object-cover"
                        />
                        <p className="text-sm font-medium mt-2 text-primary-main">
                          {product.product_id.name}
                        </p>

                    </div>
                  ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
