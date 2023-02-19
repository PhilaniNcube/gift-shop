import Image from "next/image";

const GiftsForHerBanner = () => {
  return <section className="max-w-7xl px-4 lg:px-0 relative mx-auto mb-4 overflow-hidden rounded-md ">
    <Image src="/images/ladies-gifts.jpg" width={1920} height={1280} alt="Ladies Gifts" className="aspect-1 sm:aspect-[3/2] lg:aspect-[3/1] object-cover w-full" />
    <div className="absolute inset-0 bg-slate-300/40 flex flex-col justify-end items-start gap-4 p-6 lg:p-10">
      <h1 className="text-4xl sm:text-3xl lg:text-6xl font-bold text-primary-main">Gifts For Her</h1>
    </div>
  </section>;
};
export default GiftsForHerBanner;
