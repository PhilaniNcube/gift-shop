import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import ShoppingCartItem from "./ShoppingCartItem";

import { useQuery } from "@tanstack/react-query";
import formatCurrency from "../../lib/formatCurrency";
import Link from "next/link";
import { getBundles } from "../../fetchers/bundles";



const ShoppingCart = ({isOpen}:{isOpen:boolean}) => {


  const {closeCart, cartItems} = useShoppingCart()

const {
  data: products,
  isLoading,
  isSuccess,
} = useQuery({
  queryKey: ["bundles"],
  queryFn: getBundles,
});

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => closeCart()}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems.map((product) => (
                              <ShoppingCartItem
                                key={product.id}
                                id={product.id}
                                quantity={product.quantity}
                              />
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between  text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        {isLoading ? (
                          <p>loading...</p>
                        ) : (
                          isSuccess && (
                            <p>
                              {formatCurrency(
                                cartItems.reduce((total, cartItem) => {
                                  const item = products?.find(
                                    (i) => i.id === cartItem.id
                                  );

                                  return (
                                    total +
                                    (item?.price || 0) * cartItem.quantity
                                  );
                                }, 0)
                              )}
                            </p>
                          )
                        )}
                      </div>

                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/checkout"
                          onClick={() => closeCart()}
                          className="flex items-center justify-center rounded-md border border-transparent bg-primary-main px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-main"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-primary-main hover:text-indigo-500"
                            onClick={() => closeCart()}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}


export default ShoppingCart
