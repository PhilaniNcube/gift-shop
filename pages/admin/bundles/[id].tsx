import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import Layout from "../../../components/Admin/Layout";

import { getBundleById, getBundleProducts } from "../../../fetchers/bundles";
import { getProducts } from "../../../fetchers/products";
import supabase from "../../../lib/client";
import formatCurrency from "../../../lib/formatCurrency";



const Product = ({
  bundle,
  products,
  bundleProducts,
}: {
  bundle: IBundle;
  products: IProduct[];
  bundleProducts:IBundleProduct[];
}) => {

  const router = useRouter()

  const [uploadData, setUploadData] = useState({});

  console.log(uploadData);

  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { image } = Object.fromEntries(new FormData(e.currentTarget));

    // const fileInput = Array.from(form.elements).find((item) => item.getAttribute('type') === 'file')

    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "g02mzonw");

    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((r) => r.json())
      .catch((err) => err.json());
    console.log({ data });

    setUploadData(data);

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { name, cost, details, price, quantity } =
      Object.fromEntries(new FormData(e.currentTarget));

    if (
      typeof name !== "string" ||
      typeof quantity !== "string" ||
      typeof cost !== "string" ||
      typeof price !== "string" ||


      typeof details !== "string"
    ) {
      throw new Error("Please enter a valid data");
    }

    const { data, error } = await supabase
      .from("bundles")
      .update({
        products: {
          name: name,

          cost: cost,
          price: price,

          details: details,
          image: uploadData,
        },
      })
      .eq("id", bundle.id);

    console.log({ data, error });

    setLoading(false);
  };


  const deleteFromBundle = async (id: string) => {
    const { data, error } = await supabase
      .from("bundle_products")
      .delete()
      .eq("product_id", id)

      console.log('delete product', data, error)


    if (data) {
      const bundleItems = await getBundleProducts(bundle.id);

      const totalPrice = bundleItems.reduce(
        (acc, product) => acc + product.quantity * product.product_id.price,
        0
      );
      const totalCost = bundleItems.reduce(
        (acc, product) => acc + product.quantity * product.product_id.cost,
        0
      );

      const { data: bundleProduct, error: errorProduct } = await supabase
        .from("bundles")
        .update({ price: totalPrice, cost: totalCost })
        .eq("id", bundle.id);
      console.log({ data, error, bundleProduct, errorProduct });
           router.reload();
    }

    console.log({ data, error });
     router.reload()
  };

  const addBundleProduct = async (
    e: React.FormEvent<HTMLFormElement>,
    product: IProduct
  ) => {
    e.preventDefault();

    const { quantity } = Object.fromEntries(new FormData(e.currentTarget));
    console.log({ product, quantity });

    const { data, error } = await supabase
      .from("bundle_products")
      .insert([
        { product_id: product.id, bundle_id: bundle.id, quantity: quantity },
      ])
      .single();

      if(data) {

        const bundleItems = await getBundleProducts(bundle.id);

         const totalPrice = bundleItems.reduce(
           (acc, product) => acc + product.quantity * product.product_id.price,
           0
         );
         const totalCost = bundleItems.reduce(
           (acc, product) => acc + product.quantity * product.product_id.cost,
           0
         );

            const { data: bundleProduct, error: errorProduct } = await supabase
              .from("bundles")
              .update({ price: totalPrice, cost: totalCost })
              .eq("id", bundle.id);
              console.log({ data, error, bundleProduct, errorProduct });
      }

     console.log({ data, error});
    //  router.reload()
  };



  return (
    <Layout>
      <div>
        <Link href="/admin/dashboard">
          <a className="font-bold text-primary-main text-2xl">
            Back To Dashboard
          </a>
        </Link>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-gray-300 py-3">
          <div className="w-full">
            {" "}
            <h1 className="text-3xl font-bold text-primary-main">
              Product Name: {bundle?.title}
            </h1>
            <h3 className="text-lg text-slate-500">
              Selling Price {formatCurrency(bundle?.price)}
            </h3>
            <h3 className="text-lg font-bold text-primary-main">
              Cost Price {formatCurrency(bundle.cost)}
            </h3>
            <div className="mt-3 flex gap-4">
              {" "}
              <p className="font-medium text-slate-600 mt-1">
                {bundle.description}
              </p>
            </div>
          </div>

          <Image
            src={bundle.main_image.url}
            width={bundle.main_image.width}
            height={bundle.main_image.height}
            alt={bundle.title}
            className="w-60 h-60 object-cover"
          />
        </div>
        <div className="mt-3">
          <h2 className="my-2 font-extrabold text-2xl text-gray-500">Products In Bundle</h2>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {bundleProducts.map((product) => (
              <div
                key={product.product_id.id}
                className="text-sm p-3 flex items-center space-x-3 my-1 rounded-lg bg-gray-300"
              >
                <div className="text-bold flex flex-1 flex-col space-y-2">
                  <p>{product.product_id.name}</p>
                  <p>
                    Price: {formatCurrency(product.product_id.price)} &times;
                    {product.quantity}
                  </p>
                </div>
                <svg
                  onClick={() => deleteFromBundle(product.product_id.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 cursor-pointer text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2>Add Product To Bundle</h2>
          <div className="p-8 my-4 border-spacing-3 border border-dashed rounded-lg border-slate-500">
            <h3 className="font-bold text-xl text-primary-main my-1">
              Select products to add to bundle
            </h3>

            <div className="w-full grid grid-cols-2 gap-2">
              {products.map((product) => {
                const ID = bundleProducts.find(
                  (item) => item.product_id.id === product.id
                );

                if (ID?.product_id.id === product.id) {
                  return null;
                }

                return (
                  <div
                    key={product.id}
                    className="bg-slate-100 shadow-sm flex space-x-5 items-center my-2 p-2 rounded-lg w-full"
                  >
                    <Image
                      src={product.main_image}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="h-32 w-32 rounded"
                    />
                    <form
                      onSubmit={(e) => addBundleProduct(e, product)}
                      className="flex-1"
                    >
                      <label
                        htmlFor="quantity"
                        className="flex flex-col text-sm font-medium text-gray-700"
                      >
                        <span className="font-bold text-lg">
                          {product.name}
                        </span>
                        <span>
                          Selling Price: {formatCurrency(product.price)}
                        </span>
                        <span>Cost Price: {formatCurrency(product.cost)}</span>
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="Quantity"
                        name="quantity"
                        id="quantity"
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <button
                        type="submit"
                        className="py-1 ml-2 px-2 rounded-md bg-primary-main text-xs text-white mt-2"
                      >
                        Add Product
                      </button>
                    </form>
                  </div>
                );
              })}
            </div>
          </div>

          <form
            className="p-8 border-spacing-3 border border-dashed rounded-lg border-slate-500"
            onSubmit={handleImageUpload}
          >
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-1/3 py-2 rounded-md bg-primary-main text-white mt-2"
            >
              Save Image
            </button>
          </form>
          <form
            onSubmit={handleSubmit}
            className="ring-1 p-8 ring-offset-1 rounded-xl mt-4"
          >
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 ">
                <label
                  htmlFor="details"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Details/Description
                </label>
                <textarea
                  name="details"
                  id="details"
                  rows={5}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="cost"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product cost
                </label>
                <input
                  type="number"
                  name="cost"
                  id="cost"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex mt-6 w-1/3 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default Product;

export async function getServerSideProps({
  params: { id },
}: {
  params: { id: string };
}) {
  const bundle = (await getBundleById(id)) as IBundle;

   const products = (await getProducts()) as IProduct[];

   const bundleProducts = await getBundleProducts(id)



  return {
    props: {
      bundle,
      products,
      bundleProducts,
    },
  };
}
