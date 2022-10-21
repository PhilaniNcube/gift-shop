import Link from "next/link";
import Layout from "../../../components/Admin/Layout";
import { getCategories, getSingleProductById } from "../../../fetchers/products";

import formatCurrency from "../../../lib/formatCurrency";

const Product = ({product, categories}: {product: IProduct, categories: ICategory[]}) => {


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.stopPropagation()
  e.preventDefault()



   const formData = Object.fromEntries(new FormData(e.currentTarget));

   const property = Object.keys(formData)[0]

   console.log(property)


}




  return (
    <Layout>
      <div>
        <Link href="/admin/dashboard">
          <a className="font-bold text-primary-main text-2xl">
            Back To Dashboard
          </a>
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
        <div>
          <h2 className="font-bold text-2xl text-primary-main my-4">
            Edit Product
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-6">
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
                autoComplete="product name"
                placeholder={product.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className={`inline-flex mt-6 w-2/3 justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 bg-primary-main cursor-pointer`}
            >
              Save
            </button>
          </form>
          <form onSubmit={handleSubmit} className="grid grid-cols-6 mt-4 gap-6">
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
                autoComplete="product name"
                placeholder={product.size}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className={`inline-flex mt-6 w-2/3 justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 bg-primary-main cursor-pointer`}
            >
              Save
            </button>
          </form>
          <form onSubmit={handleSubmit} className="grid grid-cols-6 mt-4 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Product price{" "}
                <span className="pl-4 font-bold ">
                  {formatCurrency(product.price)}
                </span>
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className={`inline-flex mt-6 w-2/3 justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 bg-primary-main cursor-pointer`}
            >
              Save
            </button>
          </form>
          <form onSubmit={handleSubmit} className="grid grid-cols-6 mt-4 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="cost"
                className="block text-sm font-medium text-gray-700"
              >
                Product price{" "}
                <span className="pl-4 font-bold ">
                  {formatCurrency(product.cost)}
                </span>
              </label>
              <input
                type="number"
                name="cost"
                id="cost"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className={`inline-flex mt-6 w-2/3 justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 bg-primary-main cursor-pointer`}
            >
              Save
            </button>
          </form>

          <form onSubmit={handleSubmit} className="grid grid-cols-6 mt-4 gap-2">
            <div className="col-span-3">
              <label
                htmlFor="category"
                className="hidden text-sm font-medium text-gray-700"
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
            <button
              type="submit"
              className={`block w-2/3 justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 bg-primary-main cursor-pointer`}
            >
              Save
            </button>
          </form>

          <form onSubmit={handleSubmit} className="grid mt-4 grid-cols-6 gap-3">
            <div className="col-span-4 ">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700"
              >
                Product Details/Description
              </label>
              <textarea
                name="details"
                id="details"
                rows={3}
                placeholder={product.details}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className={`inline-flex mt-6 w-2/3 items-center justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 bg-primary-main cursor-pointer`}
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
