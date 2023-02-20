import Image from "next/image";

const AccountHeader = () => {
  return <header className="max-w-7xl mx-auto px-4 lg:px-0 my-6">
    <div className="relative isolate w-full rounded-md shadow overflow-hidden">
      <Image src="/images/account.jpg" width={1920} height={1280} alt="Account" className="w-full object-cover aspect-1 md:aspect-[3/2] lg:aspect-[3/1]" />
      <div className="absolute inset-0 p-6 lg:p-10 flex items-end justify-start bg-slate-400/40">
        <h1 className="text-3xl md:text-5xl text-primary-main font-bold">My Account</h1>
      </div>
    </div>
  </header>;
};
export default AccountHeader;
