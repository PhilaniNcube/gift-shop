import Head from "next/head";
import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../fetchers/products";
import supabase from "../../../lib/client";
import formatCurrency from "../../../lib/formatCurrency";

type OrderProps = {
  order: IOrder;
};

const Order = (props: OrderProps) => {
  const { data: products } = useQuery(["products"], getProducts);

  const order = props.order;

  return (
    <Fragment>
      <Head>
        <title>Order | ATG</title>
      </Head>
      <main>
        <div className="max-w-7xl mx-auto px-4 my-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <div className="my-3">
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
                            {formatCurrency(
                              product?.price || 0 * item.quantity
                            )}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="w-full">
              <h1 className="text-xl md:text-3xl font-bold text-primary-bold">
                Complete Your Order
              </h1>
              <p className="text-base text-slate-400 mt-2">
                Click the pay now button below to complete your payment
              </p>

              <div className="my-3">
                <p className="text-lg font-bold text-slate-400">Order ID</p>
                <p className="text-lg font-bold text-slate-800">{order.id}</p>
              </div>

              <div className="block" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200" />
                </div>
              </div>

              <h2 className="text-lg font-bold text-primary-bold">
                Delivery Details
              </h2>

              <div className="mt-2 w-full bg-slate-100 ring-1 ring-slate-300 text-slate-600 rounded-lg px-3 py-2">
                <p className="text-md font-bold">
                  Name: {order.first_name} {order.last_name}
                </p>
                <p className="text-md font-bold">
                  Contact Number: {order.phone_number}
                </p>
                <p className="text-md font-bold">
                  Email: {order.email_address}
                </p>
                <p className="text-md font-bold">
                  Address: {order.street_address}, <br />
                  {order.city}, {order.postal_code}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-600">
                  Shipping Cost: {formatCurrency(order.shipping)}
                </h3>
                <h3 className="text-2xl font-bold text-slate-600 mt-4">
                  Order Total: {formatCurrency(order.total)}
                </h3>
              </div>


            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};
export default Order;

export async function getServerSideProps({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return {
      props: {
        order: {},
      },
    };
  }

  return {
    props: {
      order: orders,
    },
  };
}
