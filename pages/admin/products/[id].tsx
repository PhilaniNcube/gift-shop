import Link from "next/link";
import Layout from "../../../components/Admin/Layout";
import { getSingleProducts } from "../../../fetchers/products";
import formatCurrency from "../../../lib/formatCurrency";

const Product = ({product}: {product: IProduct}) => {

  console.log({product})

  return (
    <Layout>
      <div>
        <Link href="/admin/dashboard">
          <a className="font-bold text-primary-main text-2xl">
            Back To Dashboard
          </a>
        </Link>
        <div className="mt-4 border-t border-b border-gray-300 py-3">
          <h1 className="text-3xl font-bold text-primary-main">
            Product Name: {product?.name}
          </h1>
          <div className="mt-3 flex gap-4">
            <h3 className="text-lg text-slate-500">
              Selling Price {formatCurrency(product.price)}
            </h3>
            <h3 className="text-lg font-bold text-primary-main">
              Cost Price {formatCurrency(product.cost)}
            </h3>
          </div>
          <p className="font-medium text-slate-600 mt-1">{product.details}</p>
          <p className="font-medium mt-1 text-slate-500">
            <strong className="text-slate-800">Ingredients/Contains:</strong> {product.ingredients}
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default Product;


export async function getServerSideProps({params: {id}}:{params: {id: string}}) {

  const product = await getSingleProducts(id) as IProduct;

  return {
     props: {
      product
     }
  }


}
