import { ChevronRightIcon, HeartIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import Image from "next/future/image";
import Link from "next/link";
import formatCurrency from "../../lib/formatCurrency";

const ProductDetail = ({product}:{product:IProduct}) => {

  return (
    <header className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        <span className="flex items-center space-x-3">
          <Link href="/">
            <a className="text-primary-main text-md md:text-xl cursor-pointer font-bold">
              Home
            </a>
          </Link>
          <ChevronRightIcon className="h-6 w-6 text-primary-main" />

          <Link href="/products">
            <a className="text-primary-main text-md md:text-xl cursor-pointer font-bold">
              Products
            </a>
          </Link>
          <ChevronRightIcon className="h-6 w-6 text-primary-main" />
          <p className="text-slate-500 text-md md:text-xl font-bold">
            {product.name}
          </p>
        </span>
        <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="w-full">
            <Image
              src={product.main_image}
              height={1000}
              width={1000}
              alt={product.name}
              className="w-full object-cover aspect-square rounded-lg"
            />
          </div>
          <div className="w-full">
            <h1 className="text-primary-main text-3xl font-bold md:text-4xl">
              {product.name}
            </h1>
            <p className="text-slate-600 font-bold mt-2">
              {product.details}
            </p>

            {/**Todo - add star ratings widget */}

            <h2 className="text-3xl md:text-5xl text-slate-700 mt-4 font-bold">
              {formatCurrency(product.price)}
            </h2>

            <hr className="text-slate-800 my-5" />
            <div className="flex flex-col md:flex-row space-between items-center">
              <div>
                <h3 className="font-bold text-slate-700 text-base">
                  Delivery Details
                </h3>
                <ul className="text-slate-500 text-sm">
                  <li>
                    Orders <strong>below R800</strong> will have a delivery
                    charge of R100 to major centers
                  </li>
                  <li>
                    Orders <strong>above R800</strong> will have a delivery
                    charge of R70 to major centers
                  </li>
                  <li>
                    Orders <strong>above R1500</strong> will have a free to
                    major centers
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center mt-8">
              <p className="text-lg font-bold text-primary-main">Quantity:</p>

              <span className="flex space-x-3 items-center px-2 py-1 ml-3 bg-slate-100 ring-1 ring-slate-100 rounded-lg">
                <MinusIcon className="h-7 w-7 cursor-pointer text-primary-main" />
                <small className="text-xl font-bold">2</small>
                <PlusIcon className="h-7 w-7 cursor-pointer text-primary-main" />
              </span>
            </div>

            <div className="mt-4 flex flex-col md:flex-row justify-between gap-4">
              <button className="p-3 text-white bg-primary-main md:w-1/3 rounded-lg flex justify-center space-x-2 items-center">
                <ShoppingBagIcon className="h-6 w-6" /> <p>Add To Cart</p>
              </button>
              <button className="p-3 text-primary-main border md:w-1/3 border-primary-main rounded-lg flex justify-center space-x-2 items-center">
                <HeartIcon className="h-6 w-6" /> <p>Add To Wish List</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default ProductDetail;
