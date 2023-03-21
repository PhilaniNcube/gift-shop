import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState, Fragment } from "react";
import { getOccasions } from "../fetchers/occasions";
import {  Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { getCategories } from "../fetchers/products";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { useUser } from "@supabase/auth-helpers-react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useRouter } from "next/router";
import { Database } from "../schema";

const Navigation = () => {

  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

   const router = useRouter();

   const user = useUser();

   const { cartQuantity, openCart } = useShoppingCart();

  const {data: occasions, isLoading:occasionsLoading, isSuccess: occasionsSuccess} = useQuery({
     queryKey: ['occasions'],
     queryFn:() => getOccasions(),
  })

  const {data: categories, isLoading:categoriesLoading, isSuccess: categoriesSuccess} = useQuery({
     queryKey: ['categories'],
     queryFn:() => getCategories(),
  })

const [open, setOpen] = useState(false)

const openMenu = () => {
  setOpen(true)
}

const closeMenu = () => {
  setOpen(false)
}

const toggleMenu = () => {
  setOpen(!open)
}

  return (
    <header className="py-3 shadow-md px-6 lg:px-0">
      {/*** Desktop Navigation Starts***/}
      <div className="hidden max-w-7xl mx-auto md:flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/atg_logo.png"
              width={432}
              height={187}
              alt="ATG Logo"
              className="w-52 object-cover"
            />
          </Link>
        </div>
        <nav className="flex items-center">
          <Popover className="">
            {({ open }) => (
              <Fragment>
                <Popover.Button
                  className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-primary-main hover:text-opacity-100 focus:outline-none `}
                >
                  <span className="">Gifts</span>
                  <ChevronDownIcon
                    className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-slate-800 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                    aria-hidden="true"
                  />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute top-20 left-0 right-0 z-30 w-full  shadow-md p-10 mx-auto bg-slate-50">
                    <div className="flex max-w-7xl mx-auto">
                      <div className="flex flex-col space-y-3">
                        <h2 className="font-bold text-lg text-primary-main">
                          Categories
                        </h2>
                        {categoriesLoading
                          ? "Loading..."
                          : categoriesSuccess &&
                            categories.map((category) => (
                              <Popover.Button
                                key={category.id}
                                as={Link}
                                href={`/categories/${category.slug}`}
                                className="font-medium"
                              >
                                {category.name}
                              </Popover.Button>
                            ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Fragment>
            )}
          </Popover>
          <Popover className="">
            {({ open }) => (
              <Fragment>
                <Popover.Button
                  className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-primary-main hover:text-opacity-100 focus:outline-none `}
                >
                  <span>Occasions</span>
                  <ChevronDownIcon
                    className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-slate-800 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                    aria-hidden="true"
                  />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute top-20 left-0 right-0 z-30 w-full  shadow-md p-10 mx-auto bg-slate-50">
                    <div className="flex max-w-7xl mx-auto">
                      <div className="flex flex-col space-y-3">
                        {occasionsLoading
                          ? "Loading..."
                          : occasionsSuccess &&
                            occasions.map((category) => (
                              <Popover.Button
                                key={category.id}
                                as={Link}
                                href={`/occasions/${category.slug}`}
                                className="font-medium"
                              >
                                {category.title}
                              </Popover.Button>
                            ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Fragment>
            )}
          </Popover>
          <span className="group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-primary-main hover:text-opacity-100 focus:outline-none">
            <Link href="/for-her">Gifts For Her</Link>
          </span>
          <span className="group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-primary-main hover:text-opacity-100 focus:outline-none">
            <Link href="/for-him">Gifts For Him</Link>
          </span>
          {/* <span className="group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-primary-main hover:text-opacity-100 focus:outline-none">
            <Link href="/contact">Contact</Link>
          </span> */}
        </nav>
        <div className="flex" id="auth">
          {!user ? (
            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-primary-main hover:text-gray-800"
                >
                  Sign in
                </Link>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <Link
                  href="/register"
                  className="text-sm font-medium text-primary-main hover:text-gray-800"
                >
                  Create account
                </Link>
              </div>
              <div className="ml-4 flow-root lg:ml-6">
                <span
                  onClick={openCart}
                  className="group -m-2 flex items-center p-2"
                >
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-primary-main group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-primary-main group-hover:text-gray-800">
                    {cartQuantity}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <Link
                  href="/account"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  My Account
                </Link>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <span
                  onClick={() => {
                    supabaseClient.auth.signOut();
                    router.reload();
                  }}
                  className="text-sm font-bold cursor-pointer text-red-700 hover:text-gray-800"
                >
                  Log Out
                </span>
              </div>
              <div className="ml-4 flow-root lg:ml-6">
                <span
                  onClick={openCart}
                  className="group -m-2 flex items-center p-2"
                >
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {cartQuantity}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/*** Desktop Navigation Ends***/}
      {/*** Mobile Navigation Starts***/}
      <div className="flex md:hidden w-full justify-between items-center ">
        <Link href="/">
          <Image
            src="/images/atg_logo.png"
            width={432}
            height={187}
            alt="ATG Logo"
            className="w-32 object-cover"
          />
        </Link>
        <div className="flex items-center space-x-2">
          <div className="relative isolate">
            <ShoppingBagIcon
              className="h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
              onClick={openCart}
            />
            <span className="text-sm font-medium text-slate-50 absolute border-r border-slate-300 -top-1 -right-1 p-1 bg-red-500 h-5 w-5 flex items-center justify-center rounded-full">
              {cartQuantity}
            </span>
          </div>

          <Bars3Icon className="h-8 w-8 text-primary-main" onClick={openMenu} />
        </div>

        {open && (
          <div className="absolute inset-0 bg-slate-200/40 z-[999]">
            <div className="bg-white rounded-md shadow max-w-[95%] mx-auto">
              <div className="flex justify-between items-center p-3 border-b border-slate-300">
                <Link href="/">
                  <Image
                    src="/images/atg_logo.png"
                    width={432}
                    height={187}
                    alt="ATG Logo"
                    className="w-32 object-cover"
                  />
                </Link>

                <XMarkIcon
                  className="h-8 w-8 text-primary-main"
                  onClick={closeMenu}
                />
              </div>
              <div
                className="p-4 flex flex-col border-b border-slate-300"
                onClick={toggleMenu}
              >
                <Link
                  className="my-3 text-md font-medium text-primary-main"
                  href="/bundles"
                >
                  Gifts
                </Link>
                <Link
                  className="my-3 text-md font-medium text-primary-main"
                  href="/occasion"
                >
                  Occasion
                </Link>
                <Link
                  className="my-3 text-md font-medium text-primary-main"
                  href="/for-her"
                >
                  Gifts For Her
                </Link>
                <Link
                  className="my-3 text-md font-medium text-primary-main"
                  href="/for-him"
                >
                  Gifts For Him
                </Link>
                {/* <Link
                  className="my-3 text-md font-medium text-primary-main"
                  href="/contact"
                >
                  Contact
                </Link> */}
              </div>
              <div
                className="p-4 flex flex-col bg-slate-600"
                onClick={closeMenu}
              >
                {!user ? (
                  <div className="w-full">
                    <Link
                      href="/sign-in"
                      className="text-base text-slate-50 font-medium"
                    >
                      Sign In
                    </Link>
                  </div>
                ) : (
                  <div className="w-full flex flex-col space-y-3">
                    <span
                      onClick={() => {
                        supabaseClient.auth.signOut();
                        // router.reload();
                      }}
                      className="text-base text-slate-50 font-medium flex space-x-2"
                    >
                      Log Out
                    </span>
                    <Link
                      href="/account"
                      className="text-base text-slate-50 font-medium"
                    >
                      Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Navigation;
