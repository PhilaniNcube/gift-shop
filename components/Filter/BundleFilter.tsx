import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getCategories } from "../../fetchers/products";


const BundleFilter = () => {


  const {
    isLoading,
    isSuccess,
    data: categories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <div className="flex flex-col space-y-1 p-4 bg-slate-200 rounded-lg">
      {isLoading ? 'Loading...' : isSuccess && categories.map((category) => (
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
