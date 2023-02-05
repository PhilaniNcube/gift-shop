import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
// import { useRouter } from "next/router";
import { useState } from "react";
import slugify from "slugify";
import Layout from "../../../components/Admin/Layout";
import { Database } from "../../../db_types";


const CreateOccasion = () => {
  // const router = useRouter();

    const [supabase] = useState(() =>
      createBrowserSupabaseClient<Database>()
    );

  const [uploadData, setUploadData] = useState<ImageObject | undefined>();



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


    if(data.error) alert(data.error.message);

    setUploadData(data);

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { title } = Object.fromEntries(new FormData(e.currentTarget));

    if (typeof title !== "string") {
      throw new Error("Please enter a valid data");
    }

    const slug = slugify(title, { lower: true, trim: true });

    const { data, error } = await supabase
      .from("occasion")
      .insert([
        {
          title: title,
          slug: slug,
          image: uploadData,
        },
      ]).select('*')






    setLoading(false);

    if(error) alert(`Error: ${error.details}`)

    console.log({data, error})

    // router.push(`/admin/bundles`);
  };

  return (
    <Layout>
      <div>
        <h2 className="font-bold text-2xl text-primary-main my-4">
          Create Occasion
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-1/3 py-2 rounded-md bg-primary-main text-white mt-2"
          >
            {uploadData ? "Image Saved" : "Save Image"}
          </button>
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
                Occasion
              </label>
              <input
                type="text"
                name="title"
                required
                id="title"
                autoComplete="Occasion Name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main sm:text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!uploadData}
            className={`inline-flex mt-6 w-1/3 justify-center rounded-md border border-transparent ${
              uploadData ? "bg-primary-main cursor-pointer" : "bg-gray-300"
            } py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 `}
          >
            Save
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default CreateOccasion;
