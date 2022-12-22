import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image'
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="mt-4">
      <div className="max-w-7xl mx-auto px-4 isolate relative py-3">
        <Image
          src="/images/decor.jpg"
          className="w-full rounded-lg min-h-[33vh] -z-10 object-cover"
          width={2000}
          height={1057}
          alt={"Hero"}
        />
        <div className="absolute inset-0 z-30">
          <div className="flex h-full items-center justify-end px-4">
            <div className="bg-slate-200/50 min-h-[33vh] shadow-lg rounded-l-2xl p-8">
              <h1 className="font-extrabold text-primary-main text-3xl md:text-5xl lg:text-[4rem]">
                Great Gifts
              </h1>
              <p className="text-primary-main font-bold text-sm sm:text-lg md:text-2xl max-w-[40ch] mt-1 md:mt-3 pr-8">
                No need to come up with great gift ideas. We have all the gifts
                you may need.
              </p>
              <Link
                href="/bundles"
                className="mt-3 md:mt-6 bg-primary-main hover:bg-primary-main/70 cursor-pointer w-fit px-8 py-2 text-white flex items-center text-sm md:text-xl rounded-lg"
              >
                <span>See More</span>{" "}
                <ChevronRightIcon className="text-white ml-4 h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
