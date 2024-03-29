import { useRouter } from "next/router";
import { useState } from "react";
import slugify from "slugify";
import Layout from "../../../components/Admin/Layout";
import supabase from "../../../lib/client";

const CreateCategories = () => {

  const router = useRouter()

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


    setUploadData(data);

    setLoading(false);
  };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      const { name } = Object.fromEntries(
        new FormData(e.currentTarget)
      );


      if (
        typeof name !== "string" || !uploadData
      ) {
        throw new Error("Please enter a valid data");
      }

      const slug = slugify(name, {lower:true, trim:true, } );

      const { data, error } = await supabase
        .from("categories")
        .insert([
          {
            name: name,
            slug: slug,
            image: {
              src: uploadData?.url,
              width: uploadData?.width,
              height: uploadData?.height,
            },
          },
        ])
        .single();



      setLoading(false);

      if(error) {
        alert('There was an error:' + error.message);
      }
      console.log(data)
      router.push(`/admin/bundles`);
    };


  return (
    <Layout>
      <div>
        <h2 className="font-bold text-2xl text-primary-main my-4">
          Create Category
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                type="text"
                name="name"
                required
                id="name"
                autoComplete="Category Name"
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
export default CreateCategories;
