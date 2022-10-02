import Link from "next/link";
import { useQuery } from "react-query";

import { getCategories } from "../../fetchers/products";

const Filter = () => {

  const {isLoading, isSuccess, data:categories} = useQuery(['categories'], getCategories)


  return (
    <div className="flex flex-col space-y-1 p-4 bg-slate-200 rounded-lg">
      {categories?.map((category) => (
        <Link key={category.id} href={`/categories/${category.slug}`}>
          <a className="text-lg font-medium hover:text-slate-900 text-primary-main">{category.name}</a>
        </Link>
      ))}
    </div>
  );
};
export default Filter;
