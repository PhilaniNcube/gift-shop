import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { Fragment } from "react";
import BundlesGrid from "../../components/Bundles/BundlesGrid";
import GiftsForHimBanner from "../../components/Gender/GiftsForHimBanner";
import LoadingGrid from "../../components/Gender/LoadingGrid";
import { getBundlesForHim } from "../../fetchers/bundles";

const ForHim = () => {

  const {
    data: bundles,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["gifts-for-him"],
    queryFn: getBundlesForHim,
  });

  return (
    <Fragment>
      <Head>
        <title>Gifts For Her | All Things Gifts</title>
      </Head>
      <main className="mt-4">
        <GiftsForHimBanner />
        <div className="max-w-7xl mx-auto px-4 lg:px-0 mt-4">
          {isLoading ? (
            <LoadingGrid />
          ) : (
            isSuccess && <BundlesGrid bundles={bundles} />
          )}
        </div>
      </main>
    </Fragment>
  );
};
export default ForHim;
