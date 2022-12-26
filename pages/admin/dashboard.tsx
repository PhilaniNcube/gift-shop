import Link from "next/link";

import Layout from "../../components/Admin/Layout";
import { countBundles } from "../../fetchers/bundles";

import supabase from "../../lib/client";
import formatCurrency from "../../lib/formatCurrency";

const dashboard = ({ orderTotal , count}: { orderTotal: number , count: number}) => {


  return (
    <Layout>
      <div className="grid grid-cols-3 gap-8">
        <Link href="/admin/bundles">
          <div className="w-full p-4 cursor-pointer hover:bg-slate-200 ring-1 ring-slate-300 rounded-lg aspect-video flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-primary-main">Bundles</h2>
            <p className="text-center text-md text-primary-main">
              {count}
            </p>
          </div>
        </Link>
        <Link href="/admin/orders">
          <div className="w-full p-4 cursor-pointer hover:bg-slate-200 ring-1 ring-slate-300 rounded-lg aspect-video flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-primary-main">
              Order Total
            </h2>
            <p className="text-center text-md text-primary-main">
              {formatCurrency(orderTotal)}
            </p>
          </div>
        </Link>
        <Link href="/admin/users">
          <div className="w-full p-4 cursor-pointer hover:bg-slate-200 ring-1 ring-slate-300 rounded-lg aspect-video flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-primary-main">Users</h2>
          </div>
        </Link>
      </div>
    </Layout>
  );
};
export default dashboard;




export async function getServerSideProps() {

   const { data } = await supabase.rpc("get_total_price");
   const count = await countBundles()

  return {
    props: {
      orderTotal: data,
      count
    },
  };
}
