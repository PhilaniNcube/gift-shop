import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import BundlesTable from "../../../components/Admin/Bundles/BundlesTable";
import Layout from "../../../components/Admin/Layout";
import { Database } from "../../../db_types";
import { getBundles } from "../../../fetchers/bundles";
import formatCurrency from "../../../lib/formatCurrency";



const Products = ({ bundles }: { bundles: IBundle[] }) => {

      const router = useRouter();




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
  const bundles = await getBundles() as IBundle[];

  return {
    props: {
      bundles,
    },
  };
}
