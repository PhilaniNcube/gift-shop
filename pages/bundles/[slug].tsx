import Head from "next/head";
import { Fragment } from "react";
import ProductDetail from "../../components/Product/ProductDetail";
import ProductTabs from "../../components/Product/ProductTabs";
import { getBundleBySlug, getBundles } from "../../fetchers/bundles";


const Product = ({product}:{product:IBundle}) => {



  return (
    <Fragment>
      <Head>
        <title>{product.title} | ATG </title>
      </Head>
      <ProductDetail product={product} />
      <ProductTabs product={product} />
    </Fragment>
  );
};
export default Product;


export const getStaticPaths = async () => {

  const products = (await getBundles()) as IBundle[];

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

const product = (await getBundleBySlug(slug)) as IBundle;

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
