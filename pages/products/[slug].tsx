import Head from "next/head";
import { Fragment } from "react";
import ProductDetail from "../../components/Product/ProductDetail";
import ProductTabs from "../../components/Product/ProductTabs";
import products from "../../data/products";

const Product = ({product}:{product:Product}) => {

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


export const getStaticPaths = () => {
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  console.log({ paths });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const product = products.filter((c) => c.slug === slug);

  return {
    props: {
      product: product[0],
    },
    revalidate: 10,
  };
};
