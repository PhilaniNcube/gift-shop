import Image from "next/future/image";
import Link from "next/link";

const CategoryHeader = () => {
  return (
    <header className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="w-full relative isolate rounded-lg overflow-hidden">
            <Image
              src="/images/ladies_gifts.jpg"
              width={947}
              height={1500}
              alt="Ladies Gifts"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-slate-50/40 flex p-8 justify-end items-end">
              <h2 className="text-slate-800 font-bold text-2xl md:text-4xl">
                Gifts For Women
              </h2>
            </div>
          </div>
          <div className="w-full ring-1 ring-slate-900/20 rounded-lg flex flex-col items-center text-center justify-center p-8">
            <h1 className="text-4xl md:text-[3rem] font-bold text-primary-main">
              Browse Categories
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mt-4">
              We have a wide range of gift categories to meet any occassion.
            </p>

            <Link href="/products">
              <a className="bg-primary-main hover:bg-primary-main/70 cursor-pointer text-white text-md lg:text-xl font-bold uppercase px-4 lg:px-8 py-2 mt-6 w-fit">
                Discover More
              </a>
            </Link>
          </div>{" "}
          <div className="w-full relative isolate rounded-lg overflow-hidden">
            <Image
              src="/images/drones.jpg"
              width={1000}
              height={1500}
              alt="Ladies Gifts"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-slate-50/40 flex p-8 justify-end items-end">
              <h2 className="text-slate-800 font-bold text-2xl md:text-4xl">
                Gifts For Men
              </h2>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default CategoryHeader;
