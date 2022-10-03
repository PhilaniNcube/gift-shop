import Layout from "../../../components/Admin/Layout";
import { getCategories } from "../../../fetchers/products";

const Add = ({categories}:{categories:ICategory[]}) => {
  return (
    <Layout>
      <div>
        <h2 className="font-bold text-2xl text-primary-main my-4">
          Create Product
        </h2>
        <form className="ring-1 p-8 ring-offset-1 rounded-xl mt-4">
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
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
              >
                Product weight
              </label>
              <input
                type="number"
                name="weight"
                id="weight"
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
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="country"
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
            className="inline-flex mt-6 w-1/3 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default Add;


export async function getServerSideProps() {


  const categories = (await getCategories()) as ICategory[];

  return {
    props: {

      categories
    },
  };
}
