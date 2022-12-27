import Link from "next/link";
import { QueryClient, useQuery } from "@tanstack/react-query";

import { getCategories } from "../../fetchers/products";
import { useRouter } from "next/router";

const BundleFilter = () => {

  const queryClient = new QueryClient()

  const router = useRouter()

  const {
    isLoading,
    isSuccess,
    data: categories,
  } = useQuery(["categories"], getCategories);

  return (
    <div className="flex flex-col space-y-1 p-4 bg-slate-200 rounded-lg">
      {categories?.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="text-lg font-medium hover:text-slate-900 text-primary-main"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};
export default BundleFilter;
