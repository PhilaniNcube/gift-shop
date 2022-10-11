import Image from "next/future/image";
import Link from "next/link";
import { useState } from "react";

import Layout from "../../../components/Admin/Layout";

import { getBundleById } from "../../../fetchers/bundles";
import supabase from "../../../lib/client";
import formatCurrency from "../../../lib/formatCurrency";



const Product = ({
  bundle,
}: {
  bundle: IBundle;

}) => {
  console.log({ bundle });

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

      const {
        name,
        cost,
        details,
        price,
        quantity,
        brand,
        ingredients,
      } = Object.fromEntries(new FormData(e.currentTarget));




      if (
        typeof name !== "string" ||
        typeof quantity !== "string" ||
        typeof cost !== "string" ||
        typeof price !== "string" ||
        typeof brand !== "string" ||
        typeof ingredients !== "string" ||
        typeof details !== "string"

      ) {
        throw new Error("Please enter a valid data");
      }



         const { data, error } = await supabase
           .from("bundles")
           .update({
             products: {
               name: name,
               quantity: quantity,
               cost: cost,
               price: price,
               brand: brand,
               ingredients: ingredients,
               details: details,
               image: uploadData,
             },
           })
           .eq("id", bundle.id);

          console.log({data, error})

      setLoading(false);

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
              Selling Price {formatCurrency(bundle.price)}
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
        <div>
          <h2 className="font-bold text-2xl text-primary-main my-4">
            Add Bundle Product
          </h2>

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
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="ingredients"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Ingredients/Contents
                </label>
                <input
                  type="text"
                  name="ingredients"
                  id="ingredients"
                  autoComplete="ingredients"
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
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  autoComplete="brand"
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



  return {
    props: {
      bundle,

    },
  };
}
