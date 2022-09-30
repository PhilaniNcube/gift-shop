import Image from "next/future/image";

const ProductsBanner               = () => {
  return (
    <header className="py-8">
      <div className="max-w-7xl mx-auto px-4 relative isolate">
        <Image
          src="/images/products.jpg"
          width={1500}
          height={750}
          alt="Products"
          className="rounded-lg w-full object-cover object-bottom"
        />
        <div className="absolute inset-0 flex justify-end items-center p-12">
          <h1 className="text-3xl md:text-5xl font-bold text-center text-white uppercase tracking-wider">
          Our Products
          </h1>
        </div>
      </div>
    </header>
  );
};
export default ProductsBanner              ;
