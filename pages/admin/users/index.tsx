import Link from "next/link";
import Layout from "../../../components/Admin/Layout";

const Users = () => {
  return (
    <Layout>
      <div>
        <Link
          href="/admin/dashboard"
          className="font-bold text-primary-main text-2xl"
        >
          Back To Dashboard
        </Link>
      </div>
    </Layout>
  );
};
export default Users;
