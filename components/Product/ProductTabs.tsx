
import { Tab } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";

function classNames(...classes: string[]): string{
  return classes.filter(Boolean).join(" ");
}

export default function ProductTabs() {

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
            Featured Products
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur voluptate quo quaerat quasi ullam dolore facere
              distinctio doloremque rerum vero, esse animi aut odit incidunt!
              Nisi commodi repudiandae incidunt culpa illo necessitatibus nihil
              debitis a distinctio quaerat consequatur asperiores iste eum
              impedit laboriosam quasi, aspernatur officia numquam deleniti
              magni excepturi provident. Ipsam rem quam deserunt!
            </p>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "text-primary-main"
            )}
          >
            <div className="flex gap-6 flex-wrap">
              {featured_products.map((product) => (
                <Link href={product.slug} key={product.id}>
                  <div className="group">
                    <Image
                      src={product.image.src}
                      width={product.image.width}
                      height={product.image.height}
                      alt={product.name}
                      className="w-36 rounded-lg aspect-square group-hover:opacity-60 cursor-pointer object-cover"
                    />
                    <p className="text-xs text-primary-main">{product.name}</p>
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
