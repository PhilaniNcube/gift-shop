import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import Layout from "../../../components/Admin/Layout";
import CategoriesTable from "../../../components/Categories/CategoriesTable";
import { getCategories } from "../../../fetchers/products";
import { Database } from "../../../schema";


type Category = Database["public"]["Tables"]["categories"]["Row"];

type ComponentProps = {
  categories: Category[];
};

const index = ({ categories }: ComponentProps) => {

  const {data, isLoading, isSuccess} = useQuery({
    queryKey: ["categories"],
    queryFn:  getCategories,
    initialData: categories
  })


  return (
    <Layout>
      <main>
        {isLoading
          ? "Loading..."
          : isSuccess && <CategoriesTable categories={data} />}
      </main>
    </Layout>
  );
};
export default index;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabaseServerClient = createServerSupabaseClient<Database>(ctx);

  const { data: categories } = await supabaseServerClient
    .from("categories")
    .select("*");

  return {
    props: {
      categories,
    },
  };
}
