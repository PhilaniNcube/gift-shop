import { Switch } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "../../../components/Admin/Layout";
import { getBundleProducts, getBundles } from "../../../fetchers/bundles";
import { getOrderById } from "../../../fetchers/orders";
import {
  getCategories, getProducts,
} from "../../../fetchers/products";
import supabase from "../../../lib/client";

import formatCurrency from "../../../lib/formatCurrency";

const Product = ({
  order,
  categories,
}: {
  order: IOrder;
  categories: ICategory[];
}) => {

  const router = useRouter()




  const { data: bundles } = useQuery(["bundles"], getBundles);

  const setShippingStatus = async () => {
    const {data, error} = await supabase
      .from("orders")
      .update({ shipped: true })
      .eq("id", order.id).select("*");

      if(error) {
        alert(`There was an error updating: ${error.details}`)
           router.reload();
      } else if(data) {
        alert(`Successfully updated`)
        router.reload()
      } else {
        alert(`There was an error updating`)
      }
  }
//

  return (
    <Layout>
      <div>
        <Link
          href="/admin/dashboard"
          className="font-bold text-primary-main text-2xl"
        >
          Back To Dashboard
        </Link>
        <div className="w-full">
          <div className="flex gap-8 border-b py-2 border-slate-300">
            <div className="flex-1">
              <ul>
                {order.order_items?.map((item) => {
                  const product = bundles?.find((p) => p.id === item.id);

                  return (
                    <li key={product?.id} className="flex space-x-3">
                      <Link href={`/admin/bundles/${product?.id}`}>
                        <img
                          src={product?.main_image.secure_url}
                          alt="Product"
                          width={150}
                          height={150}
                          className="h-36 w-36 rounded object-cover"
                        />
                        <div className="flex flex-col justify-between">
                          <span className="text-xl font-bold text-slate-700">
                            {product?.title} &times; {item.quantity} @{" "}
                            {formatCurrency(product?.price || 0)} each
                          </span>
                          <p className="text-xl font-bold text-primary-main">
                            Subtotal{" "}
                            {formatCurrency(
                              product?.price || 0 * item.quantity
                            )}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="w-full">
                <h3 className="font-bold text-xl">Delivery Address</h3>

                <p className="text-slate-500 mt-3 text-sm font-bold">
                  {order.street_address}, {order.postal_code}
                </p>
                <p className="text-slate-500 text-sm font-bold">{order.city}</p>
              </div>
              <div className="w-full">
                <h3 className="font-bold text-xl">Customer Info</h3>

                <p className="text-slate-500 text-sm mt-3 font-bold">
                  {order.first_name} {order.last_name}
                </p>
                <p className="text-slate-500 text-sm font-bold">
                  {order.email_address}
                </p>
                <p className="text-slate-500 text-sm font-bold">
                  {order.phone_number}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full p-4 mt-8 bg-slate-200 rounded-lg">
            <div className="grid grid-cols-3 gap-6">
              <div className="w-full">
                <h3 className="text-md font-bold text-slate-600">
                  Billing Address
                </h3>
                <p className="text-slate-500 text-sm mt-3 font-bold">
                  {order.first_name} {order.last_name}
                </p>
                <p className="text-slate-500 text-sm font-bold">
                  {order.email_address}
                </p>
                <p className="text-slate-500 text-sm font-bold">
                  {order.phone_number}
                </p>
                <p className="text-slate-500 mt-3 text-sm font-bold">
                  {order.street_address}, {order.postal_code}
                </p>
                <p className="text-slate-500 text-sm font-bold">{order.city}</p>
              </div>
              <div className="w-full">
                <h3 className="text-md font-bold text-slate-600">
                  Payment & Shipping Status
                </h3>

                <p className="text-slate-500 text-sm mt-3 font-bold">
                  {order.paid ? "Payment: Paid" : "Payment: Not Paid"}
                </p>
                <p className="text-slate-500 text-sm mt-3 font-bold">
                  {order.shipped ? "Shipped: Shipped" : "Shipped: Not Shipped"}
                </p>
              </div>
              <div className="w-full text-slate-600 font-bold">
                <span className="flex justify-between border-b border-slate-400 py-3">
                  <p>Subtotal</p>
                  <p>{formatCurrency(order.order_subtotal)}</p>
                </span>
                <span className="flex justify-between border-b border-slate-400 py-3 ">
                  <p>Shipping</p>
                  <p>{formatCurrency(order.shipping)}</p>
                </span>
                <span className="flex justify-between py-3 ">
                  <p className="text-2xl">Total</p>
                  <p className="text-2xl">{formatCurrency(order.total)}</p>
                </span>
              </div>
            </div>
          </div>

          <div className="w-full mt-4 rounded-lg p-6 bg-slate-200 shadow">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div>
                {" "}
                <h3 className="font-bold text-primary-main text-2xl">
                  Payment Status
                </h3>
                <p className="text-lg font-medium text-primary-main">
                  {order.paid ? "Paid" : "Not Paid"}
                </p>
              </div>
              <div>
                {" "}
                <h3 className="font-bold text-primary-main text-2xl">
                  Shipping Status
                </h3>
                <p className="text-lg font-medium text-primary-main">
                  {order.shipped ? "Shipped" : "Not Shipped"}
                </p>
                {!order.shipped && (
                  <button
                    onClick={setShippingStatus}
                    className="bg-primary-main text-white text-lg text-center px-8 py-3 w-fit rounded-lg mt-3"
                  >
                    Update Shipping Status
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Product;

export async function getServerSideProps({
  params: { id },
}: {
  params: { id: string };
}) {
  const order = (await getOrderById(id)) as IOrder;

  const categories = (await getCategories()) as ICategory[];

  return {
    props: {
      order,
      categories,
    },
  };
}
