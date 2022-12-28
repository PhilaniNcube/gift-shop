
import { Tab } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { getBundleProducts } from "../../fetchers/bundles";
import { useQuery } from "@tanstack/react-query";

function classNames(...classes: string[]): string{
  return classes.filter(Boolean).join(" ");
}

export default function ProductTabs({product}: {product: IBundle}) {


   const { data, isLoading, isSuccess, error } = useQuery(
     ["bundle_products"],
     async () => getBundleProducts(product.id)
   );

   const featured_products: Product[] = [
     {
       id: 6,
       name: "Mohair Blanket",
       slug: "mohair_blanket",
       price: 1299,
       category: "Blanket",
       description:
         "Soft blanket made from the finest mohair wool from the highlands of South Africa & Lesotho",
       tags: ["blanket", "ladies"],
       image: {
         src: "/images/blanket.jpg",
         height: 1500,
         width: 1500,
       },
     },
     {
       id: 7,
       name: "Cuban Cigars",
       slug: "cuban_cigars",
       price: 1299,
       category: "For Him",
       description: "Hand rolled tobacco filled cuban cigars",
       tags: ["cigars", "men"],
       image: {
         src: "/images/cigar.jpg",
         height: 1500,
         width: 1500,
       },
     },
   ];




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
            <div className="flex gap-6 flex-wrap">
              {isLoading
                ? "Loading..."
                : isSuccess &&
                  data.map((product) => (
                    <Link
                      href={`/products/${product.product_id.slug}`}
                      key={product.product_id.id}
                    >
                      <div className="group">
                        <Image
                          src={product.product_id.main_image}
                          width={500}
                          height={500}
                          alt={product.product_id.name}
                          className="w-36 rounded-lg aspect-square group-hover:opacity-60 cursor-pointer object-cover"
                        />
                        <p className="text-xs text-primary-main">
                          {product.product_id.name}
                        </p>
                      </div>
                    </Link>
                  ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
