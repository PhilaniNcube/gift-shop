import Head from "next/head";
import { Fragment } from "react";
import AccountHeader from "../../components/Account/AccountHeader";

const Account = () => {
  return (
            <Fragment>
              <Head>
                <title>My Account | All Things Gifts</title>
              </Head>
              <AccountHeader />
            </Fragment>
         )
};
export default Account;
