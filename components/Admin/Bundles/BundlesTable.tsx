import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import formatCurrency from "../../../lib/formatCurrency";
import { Database } from "../../../schema";

type ComponentProps = {
  bundles : IBundle[]
}

function BundlesTable({bundles}:ComponentProps) {


  const router = useRouter()

    const supabase = useSupabaseClient<Database>();

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
    <>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Bundles
            </p>
            <div>
              <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                <p
                  onClick={createProduct}
                  className="text-sm font-medium leading-none text-white"
                >
                  New Bundle
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800">
                <th className="font-normal text-left pl-4">Bundle</th>
                <th className="font-normal text-left pl-12">Featured</th>
                <th className="font-normal text-left pl-12">Created</th>
                <th className="font-normal text-left pl-20">Pricing</th>
                <th className="font-normal text-left pl-20">Gender</th>
                <th className="font-normal text-left pl-16">Category</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {bundles.map((bundle) => (
                <tr
                  key={bundle.id}
                  onClick={() => router.push(`/admin/bundles/${bundle.id}`)}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 cursor-pointer border-b border-t border-gray-100"
                >
                  <td className="pl-4 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10">
                        <img
                          className="w-full h-full"
                          src={bundle.main_image.url}
                        />
                      </div>
                      <div className="pl-4">
                        <p className="font-medium">{bundle.title}</p>
                        <p className="text-xs leading-3 text-gray-600 pt-2"></p>
                      </div>
                    </div>
                  </td>
                  <td className="pl-12">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {bundle.featured ? "Featured" : "Not Featured"}
                    </p>
                  </td>
                  <td className="pl-12">
                    <p className="font-medium">
                      {format(new Date(bundle.created_at), "yyyy-MM-dd")}
                    </p>
                  </td>
                  <td className="pl-20">
                    <p className="font-medium text-green-600">
                      {" "}
                      {formatCurrency(bundle.price)}
                    </p>
                    <p className="text-xs leading-3 text-red-600 mt-2">
                      {formatCurrency(bundle.cost)}
                    </p>
                  </td>
                  <td className="pl-20">
                    <p className="font-medium">
                      {bundle.gender === "him" ? "For Him" : "For Her"}
                    </p>
                  </td>
                  <td className="pl-16">
                    <div className="flex items-center">
                      <p className="font-medium">
                        {bundle.category.name}
                      </p>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default BundlesTable;
