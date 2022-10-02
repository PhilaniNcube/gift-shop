import Head from "next/head";
import { Fragment } from "react";
import ProductDetail from "../../components/Product/ProductDetail";
import ProductTabs from "../../components/Product/ProductTabs";
import { getProducts } from "../../fetchers/products";

const Product = ({product}:{product:IProduct}) => {

console.log(product.id)

  return <Fragment>
    <Head>
      <title>{product.name} | ATG </title>
    </Head>
    <ProductDetail product={product}  />
    <ProductTabs />
  </Fragment>;
};
export default Product;


export const getStaticPaths = async () => {

  const products = (await getProducts()) as IProduct[];

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  console.log({ paths });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {

const products = (await getProducts()) as IProduct[];

  const product = products.filter((c) => c.slug === slug);

  return {
    props: {
      product: product[0],
    },
    revalidate: 10,
  };
};
