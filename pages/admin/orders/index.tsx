import { useRouter } from "next/router";
import Layout from "../../../components/Admin/Layout";
import { getOrders } from "../../../fetchers/orders";
import formatCurrency from "../../../lib/formatCurrency";

const Orders = ({orders}: {orders: IOrder[]}) => {

  const router = useRouter()

  return (
    <Layout>
      <>
        <div className="bg-white shadow w-full px-6 sm:px-12 py-5 sm:py-10">
          <div className="mb-5 sm:mb-10 rounded-tl-lg rounded-tr-lg">
            <div className="sm:flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Orders
              </p>
              <div className="flex items-center mt-4 sm:mt-0">
                <div className="flex items-center pl-3 bg-white  rounded-md ">
                  <input
                    type="text"
                    className="py-2.5 pl-1 w-40 sm:w-64 focus:outline-none text-sm rounded-md text-gray-600 placeholder-gray-400"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="h-20 w-full text-sm leading-none text-gray-600">
                    <th className="font-normal text-left pl-4">Email</th>
                    <th className="font-normal text-left pl-10">City</th>
                    <th className="font-normal text-left pl-10">Customer</th>
                    <th className="font-normal text-left pl-10">Amount</th>
                    <th className="font-normal text-left pl-10">Status</th>
                    <th className="font-normal text-left pl-10">Number</th>
                    <th className="font-normal text-left pl-10 w-32">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-50"
                    >
                      <td className="pl-4">{order.email_address}</td>
                      <td className="pl-10 text-xs">{order.city}</td>
                      <td className="pl-10">
                        <div className="flex items-center">{`${order.first_name} ${order.last_name}`}</div>
                      </td>
                      <td className="pl-10">{formatCurrency(order.total)}</td>
                      <td className="pl-10">
                        <div className="w-20 h-6 flex items-center justify-center bg-blue-50 rounded-full">
                          <p className={`text-xs leading-3 font-bold uppercase ${order.paid ? 'text-green-500' : 'text-red-500'}`}>
                            {order.paid ? "Paid" : "Not Paid"}
                          </p>
                        </div>
                      </td>
                      <td className="pl-10 text-xs">{order.phone_number}</td>
                      <td className="pl-10">
                        <div className="flex items-center">
                          <button onClick={() => router.push(`/admin/orders/${order.id}`)} className="focus:outline-none bg-gray-100 mr-5 hover:bg-gray-200 py-2.5 px-5 rounded text-sm leading-3 text-gray-500">
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};
export default Orders;


export async function getServerSideProps() {
  const orders = await getOrders();

  return {
    props: {
      orders,
    },
  };
}
