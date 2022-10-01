import Head from "next/head";
import { Fragment } from "react";
import CategoryHeader from "../../components/Categories/CategoryHeader";

const Categories = () => {
  return <Fragment>
    <Head>
      <title>Categories | ATG</title>
    </Head>
    <CategoryHeader />
  </Fragment>;
};
export default Categories;
