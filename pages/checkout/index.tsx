/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from "next/head";
import { Fragment, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import formatCurrency from "../../lib/formatCurrency";

const deliveryMethods = [
  {
    id: 1,
    name: "Postnet to Postnet",
    time: "5 working days",
    price: 89,
  },
  {
    id: 2,
    name: "Door to door",
    time: "3 working days",
    price: 125,
  },
];

const index = () => {

const [selected, setSelected] = useState(deliveryMethods[0]);

  return (
    <Fragment>
      <Head>
        <title>Checkout | ATG</title>
      </Head>
      <main className="my-6">
        <section className="max-w-7xl mx-auto px-4 bg-slate-100 rounded-lg">
          <div className="grid gap-8 grid-cols-2">
            <div className="col-span-2 lg:col-span-1 p-3">
              <h2 className="text-xl font-bold text-slate-800">
                Contact Information
              </h2>
              <form className="mt-3">
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="email_address"
                    className="text-sm md:text-md  text-slate-500 font-medium"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="email_address"
                    id="email_address"
                    required
                    className="block w-full rounded-md border-gray-300 px-2 focus:border-primary-main focus:ring-primary-main sm:text-sm"
                  />
                </div>
                <div className="hidden sm:block" aria-hidden="true">
                  <div className="py-5">
                    <div className="border-t border-gray-200" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 my-2 gap-4">
                  <div className="w-full flex flex-col">
                    <label
                      htmlFor="first_name"
                      className="text-sm md:text-md  text-slate-500 font-medium"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      required
                      autoComplete="first_name"
                      className="block w-full rounded-md border-gray-300 px-2 focus:border-primary-main focus:ring-primary-main sm:text-sm"
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <label
                      htmlFor="last_name"
                      className="text-sm md:text-md  text-slate-500 font-medium"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      required
                      autoComplete="last_name"
                      className="block w-full rounded-md border-gray-300 px-2 focus:border-primary-main focus:ring-primary-main sm:text-sm"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="street_address"
                    className="text-sm md:text-md  text-slate-500 font-medium"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street_address"
                    id="street_address"
                    required
                    className="block w-full rounded-md border-gray-300 px-2 focus:border-primary-main focus:ring-primary-main sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 my-2 gap-4">
                  <div className="w-full flex flex-col">
                    <label
                      htmlFor="city"
                      className="text-sm md:text-md  text-slate-500 font-medium"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      required
                      autoComplete="city"
                      className="block w-full rounded-md border-gray-300 px-2 focus:border-primary-main focus:ring-primary-main sm:text-sm"
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <label
                      htmlFor="postal_code"
                      className="text-sm md:text-md  text-slate-500 font-medium"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      required
                      autoComplete="postal_code"
                      className="block w-full rounded-md border-gray-300 px-2 focus:border-primary-main focus:ring-primary-main sm:text-sm"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="phone_number"
                    className="text-sm md:text-md  text-slate-500 font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    required
                    className="block w-full rounded-md border-gray-300 px-2 focus:border-primary-main focus:ring-primary-main sm:text-sm"
                  />
                </div>{" "}
                <div className="block" aria-hidden="true">
                  <div className="py-5">
                    <div className="border-t border-gray-200" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  Delivery Method
                </h2>
                <div className="w-full py-4">
                  <div className="w-full">
                    <RadioGroup value={selected} onChange={setSelected}>
                      <RadioGroup.Label className="sr-only">
                        Delivery Methods
                      </RadioGroup.Label>
                      <div className="grid gird-cols-1 md:grid-cols-2 gap-4">
                        {deliveryMethods.map((method, i) => (
                          <RadioGroup.Option
                            key={i}
                            value={method}
                            className={({ active, checked }) =>
                              `w-full ${
                                active
                                  ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                                  : ""
                              }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex w-full items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-medium  ${
                                          checked
                                            ? "text-white"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {method.name}
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                        as="span"
                                        className={`inline ${
                                          checked
                                            ? "text-sky-100"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        <span>{formatCurrency(method.price)}</span>
                                        <h2 className="font-bold">Delivery Time: {method.time}</h2>
                                      </RadioGroup.Description>
                                    </div>
                                  </div>
                                  {checked && (
                                    <div className="shrink-0 text-white">
                                      <CheckIcon className="h-6 w-6" />
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-span-2 lg:col-span-1 p-3">
              <h2 className="text-xl font-bold text-slate-800">
                Order Summary
              </h2>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};
export default index;
