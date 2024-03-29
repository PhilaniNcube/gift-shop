import {useState} from 'react'
import Layout from "../../../components/Admin/Layout";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import slugify from 'slugify';
import { useRouter } from 'next/router';
import { Database } from '../../../schema';
import { getOccasion } from '../../../fetchers/occasions';

type Occasion = Database["public"]["Tables"]["occasion"]["Row"];


type ComponentProps = {
  occasion: Occasion;

};

const Occasion = ({occasion}:ComponentProps) => {


const router = useRouter()

const [occasionData, setOccasionData] = useState<Occasion>(occasion);
const [loading, setLoading] = useState(false)

  const [supabase] = useState(() => createBrowserSupabaseClient<Database>());


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
        .update(
          {
            title: title,
            slug: slug,
            // image: uploadData,
          },
        ).eq('id', occasion.id)
        .select("*");

      setLoading(false);

      if (error) alert(`Error: ${error.details}`);

      console.log({ data, error });

      // router.reload();
      router.push(`/admin/occasions`);
    };



  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="ring-1 p-8 ring-offset-1 rounded-xl mt-4 max-w-5xl"
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
              value={occasionData.title}
              onChange={(e) => {
                setOccasionData({
                  ...occasionData,
                  title: e.target.value,
                });
              }}
              required
              id="title"
              autoComplete="Occasion Name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main sm:text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className={`inline-flex mt-6 w-1/3 bg-blue-700 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 `}
        >
          Save
        </button>
      </form>

      <form className="ring-1 p-8 ring-offset-1 rounded-xl mt-4 max-w-5xl">
        {" "}
        <button
          disabled={loading}
          type="submit"
          className={`inline-flex mt-6 w-1/3 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 ${
            loading ? "bg-blue-700/30" : "bg-blue-700"
          }`}
        >
          Save
        </button>
      </form>
    </Layout>
  );
};
export default Occasion;


export async function getServerSideProps({params:{slug}}:{params: {slug:string}}) {


  const occasion = await getOccasion(slug)

// const bundles = await getBundles()

  return {
    props: {

      occasion,

    },
  };
}
