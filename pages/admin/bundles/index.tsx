
import Head from "next/head";

import BundlesTable from "../../../components/Admin/Bundles/BundlesTable";
import Layout from "../../../components/Admin/Layout";

import { getBundles } from "../../../fetchers/bundles";
import { Database } from "../../../schema";




const Products = ({ bundles }: { bundles: Database['public']['Tables']['bundles']['Row'][] }) => {
  return (
    <Layout>
      <Head>
        <title>Bundles | Admin | All Things Gifts</title>
      </Head>
      <div>


        <BundlesTable bundles={bundles} />


      </div>
    </Layout>
  );
};

export default Products;

export async function getServerSideProps() {
  const bundles = await getBundles();

  return {
    props: {
      bundles,
    },
  };
}
