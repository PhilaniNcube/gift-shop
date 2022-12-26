import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import slugify from "slugify";
import Layout from "../../../components/Admin/Layout";
import { Database } from "../../../db_types";
import { getCategories, getProducts } from "../../../fetchers/products";



const Add = () => {

     const [supabaseClient] = useState(() =>
       createBrowserSupabaseClient<Database>()
     );
  const router = useRouter();





  const [uploadData, setUploadData] = useState<ImageObject>();



  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation()
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

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { title, description } =
      Object.fromEntries(new FormData(e.currentTarget));


    if (
      typeof title !== "string" ||
      typeof description !== "string"
    ) {
      throw new Error("Please enter a valid data");
    }

    const slug = slugify(title, {lower: true});

    const { data, error } = await supabaseClient
      .from("bundles")
      .insert([
        {
          title: title,
          slug: slug,
          description: description,
          main_image: uploadData,
        },
      ])
      .single();



    if(error) alert(`There was an error: ${error.message}. ${error.details}}`);



    setLoading(false);

    router.push(`/admin/bundles`);

  };

  return (
    <Layout>
      <div>
        <h2 className="font-bold text-2xl text-primary-main my-4">
          Create Bundle
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
            {loading ? "Loading..." : "Save Image"}
          </button>

          {uploadData && (
            <Image
              src={uploadData?.url}
              width={uploadData?.width}
              height={uploadData?.height}
              alt="Product Image"
              className="w-40 h-40 object-cover mt-3"
            />
          )}
        </form>
        <form
          onSubmit={handleSubmit}
          className="ring-1 p-8 ring-offset-1 rounded-xl mt-4"
        >
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Bundle title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="Bundle Title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 ">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={5}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`inline-flex mt-6 w-1/3 justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-primary-main cursor-pointer`}
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
  const products = (await getProducts()) as IProduct[];

  return {
    props: {
      categories,
      products
    },
  };
}
