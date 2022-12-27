import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../../components/Admin/Layout";
import { Database } from "../../../db_types";
import { getBundles } from "../../../fetchers/bundles";
import formatCurrency from "../../../lib/formatCurrency";



const Products = ({ bundles }: { bundles: IBundle[] }) => {

      const router = useRouter();

      const supabase = useSupabaseClient<Database>()

      const createProduct = async () => {
        const { data, error } = await supabase
          .from("bundles")
          .insert([
            {
              title: "Draft Bundle",
              slug: Math.random().toString(),
              description: "",

            },
          ])
          .select("*")
          .single();

        if (error) {
          alert(error.details);
        } else if (data) {
          router.push(`/admin/bundles/${data.id}`);
        }
      };


  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center w-full my-3">
          <Link
            href="/admin/dashboard"
            className="font-bold text-primary-main text-2xl"
          >
            Back To Dashboard
          </Link>

          <button onClick={createProduct} className="text-white bg-primary-main font-bold text-lg uppercase px-8 py-2 rounded-lg">New Bundle</button>
        </div>

        <div className="w-full grid grid-cols-2 gap-6">
          {bundles?.map((bundle) => (
            <Link key={bundle.id} href={`/admin/bundles/${bundle.id}`}>
              <div className="flex gap-3 hover:bg-gray-200 py-4 px-3 cursor-pointer">
                <Image
                  src={bundle.main_image.url}
                  width={100}
                  height={100}
                  alt={bundle.main_image.original_filename}
                  className="h-full aspect-square object-cover rounded"
                />
                <div className="">
                  <h3 className="text-primary-main font-bold">{bundle.title}</h3>
                  <div className="w-full flex justify-between font-medium text-md py-2">
                    <p>Price: {formatCurrency(bundle.price)}</p>
                    <p>Cost: {formatCurrency(bundle.cost)}</p>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {bundle.description}
                  </p>
                  <h4 className="text-md mt-2 text-primary-main font-bold">
                    {bundle.category?.name}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;

export async function getServerSideProps() {
  const bundles = (await getBundles()) as IBundle[];

  return {
    props: {
      bundles,
    },
  };
}
