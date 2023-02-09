import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Layout from "../../../components/Admin/Layout";
import OccasionsTable from "../../../components/Occasions/OccasionsTable";
import { Database } from "../../../db_types";


type Occasion = Database["public"]["Tables"]["occasion"]["Row"];

type ComponentProps = {
  occasions: Occasion[];
};

const index = ({ occasions }:ComponentProps) => {
  return (
    <Layout>
      <main>
        <OccasionsTable occasions={occasions} />
      </main>
    </Layout>
  );
};
export default index;




export async function getServerSideProps(ctx:GetServerSidePropsContext) {

const supabaseServerClient = createServerSupabaseClient<Database>(ctx)

  const { data: occasions, error } = await supabaseServerClient
    .from("occasion")
    .select("*") ;

  return {
    props: {
      occasions
    }
  }
}
