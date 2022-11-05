import Link from "next/link";
import { useQuery } from "react-query";
import Layout from "../../../components/Admin/Layout";
import { getOrderById } from "../../../fetchers/orders";
import {
  getCategories, getProducts,

} from "../../../fetchers/products";

import formatCurrency from "../../../lib/formatCurrency";

const Product = ({
  order,
  categories,
}: {
  order: IOrder;
  categories: ICategory[];
}) => {
  console.log({ order , categories});

  const { data: products } = useQuery(["products"], getProducts);

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
                  const product = products?.find((p) => p.id === item.id);

                  return (
                    <li key={product?.id} className="flex space-x-3">
                      <img
                        src={product?.main_image}
                        alt="Product"
                        width={150}
                        height={150}
                        className="h-36 w-36 rounded object-cover"
                      />
                      <div className="flex flex-col justify-between">
                        <span className="text-xl font-bold text-slate-700">
                          {product?.name} &times; {item.quantity} @{" "}
                          {formatCurrency(product?.price || 0)} each
                        </span>
                        <p className="text-xl font-bold text-primary-main">
                          Subtotal{" "}
                          {formatCurrency(product?.price || 0 * item.quantity)}
                        </p>
                      </div>
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
