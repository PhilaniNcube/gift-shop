import Link from "next/link";
import categories from "../../data/categories";

const Filter = () => {
  return (
    <div className="flex flex-col space-y-1 p-4 bg-slate-200 rounded-lg">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.slug}`}>
          <a className="text-lg font-medium hover:text-slate-900 text-primary-main">{category.name}</a>
        </Link>
      ))}
    </div>
  );
};
export default Filter;
