import Head from "next/head";
import { Fragment } from "react";
import CategoriesGrid from "../../components/Categories/CategoriesGrid";
import CategoryHeader from "../../components/Categories/CategoryHeader";
import { getCategories } from "../../fetchers/products";

type ComponentProps = {
  categories: ICategory[]
};

const Categories = ({categories}:ComponentProps) => {

  console.log(categories)

  return <Fragment>
    <Head>
      <title>Categories | ATG</title>
    </Head>
    <CategoryHeader />
    <CategoriesGrid categories={categories} />
  </Fragment>;
};
export default Categories;


export async function getServerSideProps() {
  const categories = await getCategories()

  return {
    props: {
      categories
    }
  }
}
