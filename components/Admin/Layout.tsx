import Link from "next/link";
import { ReactNode } from "react";

const Layout = ({children}:{children: ReactNode}) => {
  return (
    <section className="flex gap-6 relative isolate">
      <aside className="bg-primary-main relative border-b border-slate-100  w-72 max-w-md min-h-screen">
        <div className="p-4 flex flex-col py-8  space-y-3">
          <Link
            href="/admin/dashboard"
            className="text-white text-xl font-bold"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/categories/create"
            className="text-white text-xl font-bold"
          >
            Create Category
          </Link>
          <Link
            href="/admin/occasions/create"
            className="text-white text-xl font-bold"
          >
            Create Occasion
          </Link>
          <Link
            href="/admin/occasions"
            className="text-white text-xl font-bold"
          >
            Occasions
          </Link>
          <Link href="/admin/bundles/" className="text-white text-xl font-bold">
            Bundles
          </Link>
          <Link
            href="/admin/bundles/create"
            className="text-white text-xl font-bold"
          >
            Create Bundle
          </Link>
          <Link href="/admin/products" className="text-white text-xl font-bold">
            Products
          </Link>
          <Link
            href="/admin/products/add"
            className="text-white text-xl font-bold"
          >
            Add/Create Product
          </Link>
          <Link href="/admin/orders" className="text-white text-xl font-bold">
            Orders
          </Link>
          <Link href="/admin/users" className="text-white text-xl font-bold">
            Users
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 min-h-screen max-h-screen overflow-y-scroll scroll-m-0 scroll-px-0 ">
        {children}
      </main>
    </section>
  );
};
export default Layout;
