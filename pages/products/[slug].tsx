import Head from "next/head";
import { Fragment } from "react";
import ProductDetail from "../../components/Product/ProductDetail";
import ProductTabs from "../../components/Product/ProductTabs";
import { getProducts, getSingleProducts } from "../../fetchers/products";

const Product = ({product}:{product:IProduct}) => {



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



  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {

const product = (await getSingleProducts(slug)) as IProduct;

if(!product) {
  return {
    notFound: true,
  }
}

  return {
    props: {
      product,
    },
    revalidate: 10,
  };
};
