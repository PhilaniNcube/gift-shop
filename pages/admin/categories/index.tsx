import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Layout from "../../../components/Admin/Layout";
import CategoriesTable from "../../../components/Categories/CategoriesTable";
import OccasionsTable from "../../../components/Occasions/OccasionsTable";
import { Database } from "../../../db_types";

type Category = Database["public"]["Tables"]["categories"]["Row"];

type ComponentProps = {
  categories: Category[];
};

const index = ({ categories }: ComponentProps) => {
  return (
    <Layout>
      <main>
        <CategoriesTable categories={categories} />
      </main>
    </Layout>
  );
};
export default index;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabaseServerClient = createServerSupabaseClient<Database>(ctx);

  const { data: categories, error } = await supabaseServerClient
    .from("categories")
    .select("*");

  return {
    props: {
      categories,
    },
  };
}
