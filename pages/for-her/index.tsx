import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { Fragment } from "react";
import BundlesGrid from "../../components/Bundles/BundlesGrid";
import GiftsForHerBanner from "../../components/Gender/GiftsForHerBanner";
import LoadingGrid from "../../components/Gender/LoadingGrid";
import { getBundlesForHer } from "../../fetchers/bundles";

const ForHer = () => {

  const {
    data: bundles,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["gifts-for-her"],
    queryFn: getBundlesForHer,
  });



  return <Fragment>
    <Head>
      <title>Gifts For Her | All Things Gifts</title>
    </Head>
    <main className="mt-4">
     <GiftsForHerBanner />
     <div className="max-w-7xl mx-auto px-4 lg:px-0 mt-4">
      {isLoading ? <LoadingGrid /> : isSuccess && <BundlesGrid bundles={bundles} />}
     </div>
    </main>
  </Fragment>;
};
export default ForHer;
