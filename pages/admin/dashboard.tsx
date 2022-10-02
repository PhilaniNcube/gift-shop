import Link from "next/link";
import Layout from "../../components/Admin/Layout";

const dashboard = () => {
  return <Layout>
    <div className="grid grid-cols-3 gap-8">
      <Link href="/admin/products">
        <div className="w-full p-4 cursor-pointer hover:bg-slate-200 ring-1 ring-slate-300 rounded-lg aspect-video flex flex-col items-center justify-center">
           <h2 className="text-2xl font-bold text-primary-main">Products</h2>
        </div>
      </Link>
      <Link href="/admin/orders">
        <div className="w-full p-4 cursor-pointer hover:bg-slate-200 ring-1 ring-slate-300 rounded-lg aspect-video flex flex-col items-center justify-center">
           <h2 className="text-2xl font-bold text-primary-main">Orders</h2>
        </div>
      </Link>
      <Link href="/admin/users">
        <div className="w-full p-4 cursor-pointer hover:bg-slate-200 ring-1 ring-slate-300 rounded-lg aspect-video flex flex-col items-center justify-center">
           <h2 className="text-2xl font-bold text-primary-main">Users</h2>
        </div>
      </Link>
    </div>
  </Layout>;
};
export default dashboard;
