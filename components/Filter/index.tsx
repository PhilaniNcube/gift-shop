import Link from "next/link";
import { useQuery } from "react-query";

import { getCategories } from "../../fetchers/products";

const Filter = () => {

  const {isLoading, data:categories} = useQuery(['categories'], getCategories)


  return (
    <div className="flex flex-col space-y-1 p-4 bg-slate-200 rounded-lg">
      {isLoading ? (
        <p className="py-8">Loading...</p>
      ) : (
        categories?.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="text-lg font-medium hover:text-slate-900 text-primary-main"
          >
            {category.name}
          </Link>
        ))
      )}
    </div>
  );
};
export default Filter;
