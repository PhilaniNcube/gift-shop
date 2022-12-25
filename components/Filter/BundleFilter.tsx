import Link from "next/link";
import { useQuery } from "react-query";

import { getCategories } from "../../fetchers/products";

const BundleFilter = () => {
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
          href={`/bundles?category=${category.slug}`}
          className="text-lg font-medium hover:text-slate-900 text-primary-main"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};
export default BundleFilter;
