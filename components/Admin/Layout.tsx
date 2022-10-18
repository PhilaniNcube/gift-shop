import Link from "next/link";
import { ReactNode } from "react";

const Layout = ({children}:{children: ReactNode}) => {
  return <section className="flex gap-6 relative isolate">
    <aside className="bg-primary-main relative border-b border-slate-100  w-72 max-w-md min-h-screen">
      <div className="p-4 flex flex-col py-8  space-y-3">
        <Link href="/admin/dashboard">
          <a className="text-white text-xl font-bold">Dashboard</a>
        </Link>
        <Link href="/admin/categories/create">
          <a className="text-white text-xl font-bold">Create Category</a>
        </Link>
        <Link href="/admin/occasion/create">
          <a className="text-white text-xl font-bold">Create Occasion</a>
        </Link>
        <Link href="/admin/bundles/">
          <a className="text-white text-xl font-bold">Bundles</a>
        </Link>
        <Link href="/admin/bundles/create">
          <a className="text-white text-xl font-bold">Create Bundle</a>
        </Link>
        <Link href="/admin/products">
          <a className="text-white text-xl font-bold">Products</a>
        </Link>
        <Link href="/admin/products/add">
          <a className="text-white text-xl font-bold">Add/Create Product</a>
        </Link>
        <Link href="/admin/orders">
          <a className="text-white text-xl font-bold">Orders</a>
        </Link>
        <Link href="/admin/users">
          <a className="text-white text-xl font-bold">Users</a>
        </Link>
      </div>
    </aside>
    <main className="flex-1 p-8 min-h-screen max-h-screen overflow-y-scroll scroll-m-0 scroll-px-0 ">{children}</main>
  </section>;
};
export default Layout;
