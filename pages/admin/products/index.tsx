import Image from "next/image";
import Link from "next/link";
import Layout from "../../../components/Admin/Layout";
import { getProducts } from "../../../fetchers/products";
import formatCurrency from "../../../lib/formatCurrency";

 const Products = ({products}:{products:IProduct[]}) => {



  return (
    <Layout>
      <div>
        <Link
          href="/admin/dashboard"
          className="font-bold text-primary-main text-2xl"
        >
          Back To Dashboard
        </Link>
        <div className="w-full">
          {products?.map((product) => (
            <Link key={product.id} href={`/admin/products/${product.id}`}>
              <div className="flex gap-3 hover:bg-gray-200 py-4 border-b border-slate-200 px-3 cursor-pointer">
                <Image
                  src={product.main_image}
                  width={100}
                  height={100}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="">
                  <h3>{product.name}</h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {product.details}
                  </p>
                  <p className="mt-1 font-bold text-slate-700">
                    Price: {formatCurrency(product.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products


export async function getServerSideProps(){

    const products = (await getProducts()) as IProduct[];

    return {
      props: {
        products
      }
    }

}
