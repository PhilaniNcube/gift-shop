
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import slugify from "slugify";

import Layout from "../../../components/Admin/Layout";
import { Database } from "../../../db_types";

import { getBundleById, getBundleCategories, getBundleProducts } from "../../../fetchers/bundles";
import { getCategories, getProducts } from "../../../fetchers/products";
import supabase from "../../../lib/client";
import formatCurrency from "../../../lib/formatCurrency";

type Bundle = Database["public"]["Tables"]["bundles"]["Row"]
type Product = Database["public"]["Tables"]["products"]["Row"]
type BundleProduct = Database["public"]["Tables"]["bundle_products"]["Row"]
type Category = Database["public"]["Tables"]["categories"]["Row"]



const Product = ({
  bundle,
  products,
  bundleProducts,
  categories,
}: {
  bundle: Bundle;
  products: Product[];
  bundleProducts: BundleProduct[];
  categories: Category[];
}) => {
  const router = useRouter();

  const [description, setDescription] = useState(bundle.description)
  const [title, setTitle] = useState(bundle.title)
  const [price, setPrice] = useState(bundle.price)
  const [cost, setCost] = useState(bundle.cost)



const selectedCategory = categories.find(c => c.id === bundle.category?.id)



  const totalPrice = bundleProducts.reduce(
    (acc, product) => acc + product.quantity * product.product_id.price,
    0
  );
  const totalCost = bundleProducts.reduce(
    (acc, product) => acc + product.quantity * product.product_id.cost,
    0
  );

  const [loading, setLoading] = useState(false);
  const [uploadData, setUploadData] = useState({});

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

    setUploadData(data);


    const { data: bundleProduct, error: errorProduct } = await supabase
      .from("bundles")
      .update({ main_image: data })
      .eq("id", bundle.id);



    if (errorProduct) {
      alert(errorProduct.details);
    } else {
      alert("Upload Successful");
    }

    // router.reload();

    setLoading(false);
  };

  const deleteFromBundle = async (id: string) => {
    await supabase.from("bundle_products").delete().eq("product_id", id);

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

    if (errorProduct) {
      alert(errorProduct.details);
    } else {

      router.reload();
    }
  };

  const updateBundleDescription = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    const { description } = Object.fromEntries(new FormData(e.currentTarget));

    e.preventDefault();
    const { data: bundleProduct, error: errorProduct } = await supabase
      .from("bundles")
      .update({ description: description })
      .eq("id", bundle.id);



    router.reload();
  };

  const updateBundleTitle = async (e: React.FormEvent<HTMLFormElement>) => {
    const { title } = Object.fromEntries(new FormData(e.currentTarget));

    e.preventDefault();

    if(typeof title !== 'string') {
      throw new Error(`Invalid title`)
    }

    const slug = slugify(title,{lower: true, replacement: '_'} )
    const { data: bundleProduct, error: errorProduct } = await supabase
      .from("bundles")
      .update({ title: title, slug: slug })
      .eq("id", bundle.id);

    router.reload();
  };

  const updateBundlePrice = async (e: React.FormEvent<HTMLFormElement>) => {
    const { price } = Object.fromEntries(new FormData(e.currentTarget));

    e.preventDefault();
    const { data: bundleProduct, error: errorProduct } = await supabase
      .from("bundles")
      .update({ price: price })
      .eq("id", bundle.id);

    router.reload();
  };

  const updateBundleCost = async (e: React.FormEvent<HTMLFormElement>) => {
    const { cost } = Object.fromEntries(new FormData(e.currentTarget));

    e.preventDefault();
    const { data: bundleProduct, error: errorProduct } = await supabase
      .from("bundles")
      .update({ cost: cost })
      .eq("id", bundle.id);

    router.reload();
  };

  const addBundleProduct = async (
    e: React.FormEvent<HTMLFormElement>,
    product: IProduct
  ) => {
    e.preventDefault();

    const { quantity } = Object.fromEntries(new FormData(e.currentTarget));

    const { data: addedProduct, error } = await supabase
      .from("bundle_products")
      .insert([
        { product_id: product.id, bundle_id: bundle.id, quantity: quantity },
      ]);

    router.reload();
  };

  const setCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { category } = Object.fromEntries(new FormData(e.currentTarget));

    const { data, error: errorBundle } = await supabase
      .from("bundles")
      .update({ category: category })
      .eq("id", bundle.id);

    if (errorBundle) {
      alert(
        `There was an error updating the bundle: ${errorBundle.message}, ${errorBundle.hint} `
      );
    } else {
      alert("Bundle Updated");

      router.reload();
    }
  };

  return (
    <Layout>
      <div>
        <Link
          href="/admin/dashboard"
          className="font-bold text-primary-main text-2xl"
        >
          Back To Dashboard
        </Link>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-gray-300 py-3">
          <div className="w-full">
            {" "}
            <h1 className="text-xl font-bold text-primary-main">
              Product Name: {bundle?.title}
            </h1>
            <form
              onSubmit={(e) => updateBundleTitle(e)}
              className="text-lg mt-5 text-slate-500 "
            >
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bundle Title
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={bundle?.title}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex mt-2 justify-center rounded-md border border-transparent bg-primary-main py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2"
              >
                Save Title
              </button>
            </form>
            <form
              onSubmit={(e) => updateBundleDescription(e)}
              className="text-lg mt-5 text-slate-500 "
            >
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bundle Description
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={bundle?.description}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex mt-2 justify-center rounded-md border border-transparent bg-primary-main py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2"
              >
                Save Description
              </button>
            </form>
            <form
              onSubmit={setCategory}
              className="text-lg mt-5 text-slate-500 "
            >
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bundle Category
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <select
                    id="category"
                    name="category"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value={bundle.category?.id}>
                      {bundle.category?.name}
                    </option>
                    {categories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex mt-2 justify-center rounded-md border border-transparent bg-primary-main py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2"
              >
                Save Category
              </button>
            </form>
            <form
              onSubmit={(e) => updateBundlePrice(e)}
              className="text-lg mt-5 text-slate-500 "
            >
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Selling Price{" "}
                  <span className="text-xs pl-5 text-red-500">
                    Suggested Cost Price {formatCurrency(totalPrice)}
                  </span>
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={formatCurrency(bundle?.price)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex mt-2 justify-center rounded-md border border-transparent bg-primary-main py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2"
              >
                Save Price
              </button>
            </form>
            <form
              onSubmit={(e) => updateBundleCost(e)}
              className="text-lg mt-5 text-slate-500 "
            >
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cost Price{" "}
                  <span className="text-xs pl-5 text-red-500">
                    Suggested Cost Price {formatCurrency(totalCost)}
                  </span>
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="number"
                    name="cost"
                    value={cost}
                    onChange={(e) => setCost(parseInt(e.target.value))}
                    id="cost"
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={formatCurrency(bundle?.cost)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex mt-2 justify-center rounded-md border border-transparent bg-primary-main py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2"
              >
                Save Price
              </button>
            </form>
            <div className="mt-3 flex gap-4"> </div>
          </div>

          <Image
            src={bundle.main_image.url}
            width={bundle.main_image.width}
            height={bundle.main_image.height}
            alt={bundle.title}
            className="w-60 h-60 object-cover"
          />
        </div>
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

        <p className="font-medium text-slate-600 mt-1">{bundle.description}</p>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="mt-3">
          <h2 className="my-2 font-extrabold text-2xl text-gray-500">
            Products In Bundle
          </h2>
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

   const categories = (await getCategories()) as ICategory[];

   const bundleCategories = await getBundleCategories(id)



  return {
    props: {
      bundle,
      products,
      bundleProducts,
      categories,
      bundleCategories,
    },
  };
}
