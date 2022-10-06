import Link from 'next/link'
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  CreditCardIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
  UserMinusIcon,

} from "@heroicons/react/24/outline";
import { useUser } from '@supabase/auth-helpers-react';
import supabase from '../lib/client';
import { useRouter } from 'next/router';
import Image from 'next/future/image';
import { AnimatePresence } from 'framer-motion';
import { useShoppingCart } from '../context/ShoppingCartContext';




export default function Navbar() {
  const {openCart, closeCart, cartQuantity} = useShoppingCart();
  const router = useRouter()

  const navLinks = [
    { text: "Home", href: "/", active: router.asPath === '/' },
    { text: "Products", href: "/products" ,active: router.asPath === '/products'},
    { text: "Categories", href: "/categories", active: router.asPath === '/categories' },
    { text: "Bundles", href: "/bundles", active: router.asPath === '/bundles' },
  ];

  const { isLoading, user, error } = useUser();



  return (
    <header className="">
      {/* Desktop navigation begins */}
      <div className="hidden md:block max-w-7xl py-4 px-4 mx-auto">
        <div className="flex items-center justify-between">
          <nav className="flex items-center space-x-4">
            <h2 className="text-primary-main text-3xl xl:text-4xl font-extrabold">
              all things gifts
            </h2>
            <ul className="flex pl-4 items-center space-x-3">
              {navLinks.map((link, i) => (
                <Link key={i} href={link.href}>
                  <a
                    className={`text-lg font-bold ${
                      link.active ? "text-primary-main" : "text-slate-800"
                    }`}
                  >
                    {link.text}
                  </a>
                </Link>
              ))}
            </ul>
          </nav>

          <nav className="flex items-center space-x-8">
            <div className="hidden md:flex items-center bg-slate-300 rounded-md py-2 pl-2 pr-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-slate-700 fill-transparent" />
              <input
                type="text"
                className="w-64 bg-transparent border-none outline-none ml-2 focus:outline-none focus:border-none ring-0 focus:ring-transparent focus:ring-0 focus:bg-slate-200 rounde-md"
              />
            </div>
            <div className="flex items-center space-x-4 justify-between">
              {user ? (
                <Fragment>
                  <Link href="/account">
                    <UserIcon className="text-primary-main h-6 w-6 cursor-pointer" />
                  </Link>
                  <Link href="/api/auth/logout">
                    <UserMinusIcon className="text-red-400 h-6 w-6 cursor-pointer" />
                  </Link>
                  <span className="relative isolate flex">
                    <span className="absolute flex justify-center items-center -top-2 -right-2 h-4 w-4 text-xs bg-red-500 text-white rounded-full">
                      {cartQuantity}
                    </span>
                    <ShoppingCartIcon className="text-primary-main cursor-pointer h-6 w-6" />
                  </span>
                </Fragment>
              ) : (
                <Fragment>
                  <Link href="/sign-in">
                    <UserIcon className="text-primary-main h-6 w-6 cursor-pointer" />
                  </Link>
                  <div className="relative flex justify-center items-center">
                    <span className="absolute flex justify-center items-center -top-2 -right-2 h-4 w-4 text-xs bg-red-500 text-white rounded-full">
                      {cartQuantity}
                    </span>
                    <ShoppingCartIcon className="text-primary-main h-6 w-6 cursor-pointer" />
                  </div>
                </Fragment>
              )}
            </div>
          </nav>
        </div>
      </div>{" "}
      <div className="hidden md:block bg-slate-300 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center">
          <p className="slate-800 text-sm font-medium">
            Order your gifts in time for the christmas rush.
          </p>
        </div>
      </div>
      {/* Desktop navigation ends */}
    </header>
  );
}
