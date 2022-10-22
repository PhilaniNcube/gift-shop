
import { useRouter } from "next/router";
import { useState } from "react";
import slugify from "slugify";
import Layout from "../../../components/Admin/Layout";
import { getCategories } from "../../../fetchers/products";
import supabase from "../../../lib/client";

const Add = ({categories}:{categories:ICategory[]}) => {

  const router = useRouter()

  const [imageSrc, setImageSrc] = useState<string>('')
  const [uploadData, setUploadData] = useState({})

  console.log(uploadData)

  const [loading, setLoading] = useState(false)




const handleImageUpload = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setLoading(true)

 const {image} = Object.fromEntries(new FormData(e.currentTarget))

  // const fileInput = Array.from(form.elements).find((item) => item.getAttribute('type') === 'file')

 const formData = new FormData()

 formData.append('file', image)
 formData.append("upload_preset", "g02mzonw");

 const data = await fetch(
   `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`, {
    method: 'POST',
    body: formData
   }
 ).then(r => r.json()).catch(err => err.json());
 console.log({data})

 setImageSrc(data.secure_url)
 setUploadData(data)

setLoading(false)

}


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true)

  const { name, cost, details, price, size,  category } = Object.fromEntries(
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

    typeof imageSrc !== "string" ||
    typeof details !== "string"
  ) {
    throw new Error("Please enter a valid data");
  }

  const slug = slugify(name)

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name: name,
        slug: slug,
        price: parseFloat(price),
        cost: parseFloat(cost),
        size: size,

        category: category,

        details: details,
        main_image: imageSrc,
      },
    ]);

    console.log({data, error})

    setLoading(false)
    router.push('/admin/products')

};




  return (
    <Layout>
      <div>
        <h2 className="font-bold text-2xl text-primary-main my-4">
          Create Product
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
              required
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
                required
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
                required
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
                required
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
                required
                name="cost"
                id="cost"
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
                required
                id="size"
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
            disabled={imageSrc === ""}
            className={`inline-flex mt-6 w-1/3 justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 ${
              imageSrc === "" ? "bg-gray-300" : "bg-primary-main cursor-pointer"
            }`}
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
