import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { PostgrestError } from '@supabase/supabase-js';
import { QueryClient, useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {Fragment} from 'react'
import Bundle from '../../components/Occasions/Bundle';
import { Database } from '../../db_types';
import { getOccasion, getOccasionBundles, getOccasionBundlesByOccasionId } from '../../fetchers/occasions';
import serviceRole from '../../lib/serviceClient';

type OccasionType = Database["public"]["Tables"]["occasion"]["Row"];

type ComponentProps = {
  occasion: OccasionType;
};

const Occasion = ({occasion}: ComponentProps) => {




  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [`occasion ${occasion.title}`],
    queryFn: () => getOccasion(occasion.slug),
    initialData:occasion
  });


  const {
    data: occasionBundles,
    isLoading: occasionBundlesLoading,
    isSuccess: occasionBundlesSuccess,
  } = useQuery({
    queryKey: ["occasion_bundles", occasion.title],
    queryFn: () => getOccasionBundlesByOccasionId(occasion.id),
  });

  return (
    <Fragment>
      <Head>
        <title> All Things Gifts</title>
      </Head>
      <main className="max-w-7xl mx-auto px-4 lg:px-0 py-10">
        <div className="w-full relative isolate rounded-md overflow-hidden shadow-md group">
          <Image
            src={data.image.url}
            alt={data.title}
            width={data.image.width}
            height={data.image.height}
            className="w-full aspect-[3/1] object-cover rounded-md"
          />
          <div className="absolute inset-0 group-hover:bg-slate-300/20 p-10 flex items-end justify-start ">
            {" "}
            <h1 className="text-2xl lg:text-4xl font-bold text-primary-main bg-white/50 p-3 rounded-md">
              {data.title}
            </h1>
          </div>
        </div>

        <section className="mt-10 w-full">
          <span className="flex items-center space-x-3 border-b border-primary-main pb-3">
            <Link
              href="/"
              className="text-primary-main text-md md:text-xl cursor-pointer font-bold"
            >
              Home
            </Link>
            <ChevronRightIcon className="h-6 w-6 text-primary-main" />

            <Link
              href="/occasions"
              className="text-primary-main text-md md:text-xl cursor-pointer font-bold"
            >
              Occasions
            </Link>
            <ChevronRightIcon className="h-6 w-6 text-primary-main" />
            <p className="text-slate-500 text-md md:text-xl font-bold">
              {data.title}
            </p>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 md:gap-x-10 py-8">
            {occasionBundlesLoading
              ? "Loading..."
              : occasionBundlesSuccess &&
                occasionBundles.map((bundle) => (
                  <Link
                    key={bundle.bundle_id.id}
                    href={`/bundles/${bundle.bundle_id.slug}`}
                  >
                    <Bundle bundle={bundle.bundle_id} />
                  </Link>
                ))}
          </div>
        </section>
      </main>
    </Fragment>
  );
};
export default Occasion;


export async function getServerSideProps({params: {slug}}:{params:{slug:string}}){

   const queryClient = new QueryClient();

  const {data, error} = await serviceRole.from('occasion').select('*').eq('slug',slug).single()

  await queryClient.prefetchQuery([`occasion ${data.title}`], data);

  console.log(data)


  return {
    props: {
      occasion:data,

    }
  }

}
