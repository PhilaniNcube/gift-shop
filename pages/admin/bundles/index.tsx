import Image from "next/image";
import Link from "next/link";
import Layout from "../../../components/Admin/Layout";
import { getBundles } from "../../../fetchers/bundles";



const Products = ({ bundles }: { bundles: IBundle[] }) => {


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
          {bundles?.map((bundle) => (
            <Link key={bundle.id} href={`/admin/bundles/${bundle.id}`}>
              <div className="flex gap-3 hover:bg-gray-200 py-4 border-b border-slate-200 px-3 cursor-pointer">
                <Image
                  src={bundle.main_image.url}
                  width={100}
                  height={100}
                  alt={bundle.main_image.original_filename}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="">
                  <h3>{bundle.title}</h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {bundle.description}
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

export default Products;

export async function getServerSideProps() {
  const bundles = (await getBundles()) as IBundle[];

  return {
    props: {
      bundles,
    },
  };
}
