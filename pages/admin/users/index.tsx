import Link from "next/link";
import Layout from "../../../components/Admin/Layout";

const Users = () => {
  return <Layout>
    <div>
      <Link href="/admin/dashboard">
        <a className="font-bold text-primary-main text-2xl">Back To Dashboard</a>
      </Link>
    </div>
  </Layout>;
};
export default Users;
