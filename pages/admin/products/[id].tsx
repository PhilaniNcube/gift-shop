import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import slugify from "slugify";
import Layout from "../../../components/Admin/Layout";
import { getCategories, getSingleProductById } from "../../../fetchers/products";
import supabase from "../../../lib/client";

import formatCurrency from "../../../lib/formatCurrency";

const Product = ({product, categories}: {product: IProduct, categories: ICategory[]}) => {

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [prodData, setProdData] = useState(product)


console.log({product: prodData})

     const [uploadData, setUploadData] = useState<ImageObject>();





     const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       e.stopPropagation();
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
       ).then((r) => r.json()).catch((err) => err.json());


       console.log({data})

       setUploadData(data);


       setLoading(false);
     };





const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const { name, cost, details, price, size, category } = Object.fromEntries(
    new FormData(e.currentTarget)
  );
  console.log({
    name,
    cost,
    details,
    price,
    size,

    category,
  });

  if (
    typeof name !== "string" ||
    typeof cost !== "string" ||
    typeof price !== "string" ||
    typeof size !== "string" ||
    typeof category !== "string" ||
    typeof details !== "string"
  ) {
    throw new Error("Please enter a valid data");
  }

  const slug = slugify(name, {lower:true});

  const { data, error } = await supabase.from("products").update([
    {
      name: name,
      slug: slug,
      price: parseFloat(price),
      cost: parseFloat(cost),
      size: size,
      category: category,
      details: details,
      main_image:uploadData?.url
    },
  ]).eq('id', product.id).single();

  console.log({ data, error });

  if (error) {
    alert(error.details);
  }

  setLoading(false);
  // setProdData(data)
  router.push("/admin/products");
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
        <div className="mt-4 border-t border-b border-gray-300 py-3">
          <h1 className="text-3xl font-bold text-primary-main">
            Product Name: {product?.name}
          </h1>
          <div className="mt-3 flex gap-4">
            <h3 className="text-lg text-slate-500">
              Selling Price {formatCurrency(product.price)}
            </h3>
            <h3 className="text-lg font-bold text-primary-main">
              Cost Price {formatCurrency(product.cost)}
            </h3>
          </div>
          <p className="font-medium text-slate-600 mt-1">{product.details}</p>
        </div>

        <form
          onSubmit={handleImageUpload}
          className="w-full my-6 border border-primary-main rounded-lg p-4"
        >
          <h2 className="font-bold text-primary-main text-xl">
            Upload Product Image
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="w-full flex flex-col">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="border-none text-slate-700 mt-3"
              />
              <button type="submit" className="text-center w-fit text-white bg-primary-main font-bold px-8 py-2 mt-4 rounded-lg">Save Image</button>
            </div>
            <div className="w-full max-w-[200px]">
              {prodData.main_image === "" ||
              prodData.main_image === undefined ? (
                <Image
                  src="/images/placeholder.png"
                  alt="Placeholder"
                  width={1500}
                  height={1500}
                  className="w-full object-cover aspect-square"
                />
              ) : (
                <Image
                  src={prodData.main_image}
                  alt="Placeholder"
                  width={1500}
                  height={1500}
                  className="w-full object-cover aspect-square"
                />
              )}
            </div>
          </div>
        </form>

        <div>
          <h2 className="font-bold text-2xl text-primary-main my-4">
            Edit Product
          </h2>

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
                  value={prodData.name}
                  onChange={(e) => {

                    setProdData({ ...prodData, name: e.target.value });
                  }}
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
                  value={prodData.details}
                  onChange={(e) => {
                    setProdData({ ...prodData, details: e.target.value });
                  }}
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
                  value={prodData.price}
                  onChange={(e) =>
                    setProdData({
                      ...prodData,
                      price: parseFloat(e.target.value),
                    })
                  }
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
                  value={prodData.cost}
                  onChange={(e) =>
                    setProdData({
                      ...prodData,
                      cost: parseFloat(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product size
                </label>
                <input
                  type="text"
                  name="size"
                  id="size"
                  value={prodData.size}
                  onChange={(e) =>
                    setProdData({
                      ...prodData,
                      size: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`inline-flex mt-6 w-1/3 justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 bg-primary-main`}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default Product;


export async function getServerSideProps({params: {id}}:{params: {id: string}}) {

  const product = await getSingleProductById(id) as IProduct;

  const categories = await getCategories() as ICategory[]

  return {
     props: {
      product,
      categories
     }
  }


}
