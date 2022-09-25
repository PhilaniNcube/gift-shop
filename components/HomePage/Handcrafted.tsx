import Image from "next/future/image";

const Handcrafted = () => {
  return (
    <section className="mt-12">
      <div className="max-w-7xl mx-auto px-4 relative isoltae">
        <Image
          src="/images/handcrafted.jpg"
          alt="Handcrafted"
          width={1500}
          height={1000}
          className="w-full shadow-lg object-cover max-h-[45vh] rounded-lg"
        />
        <div className="absolute justify-end inset-0 flex flex-col items-start p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-main">
            Hand Wrapped Gifts
          </h2>
          <p className="mt-2 max-w-[45ch] text-slate-700 font-medium text-base tracking-wider leading-7">
            Our gifts are packed and wrapped with care because we know our
            clients expect the very best for the people in their love.{" "}
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="w-full col-span-2 md:col-span-1 relative isolate">
            <Image
              src="/images/3d_presents.jpg"
              alt="Presents"
              width={1500}
              height={947}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex justify-end items-center p-8">
              <h4 className="text-xl text-primary-main font-bold">
                Gifts for any occassion
              </h4>
            </div>
          </div>
          <div className="w-full col-span-2 md:col-span-1 relative isolate">
            <Image
              src="/images/surprise.jpg"
              alt="Presents"
              width={1500}
              height={1000}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex justify-end items-center p-8">
              <h4 className="text-xl text-primary-main font-bold">
                Surprise her just because
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Handcrafted;
