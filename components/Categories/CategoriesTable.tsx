
import { useRouter } from "next/router";
import { Database } from "../../schema";

type Category = Database["public"]["Tables"]["categories"]["Row"];

type ComponentProps = {
  categories: Category[];
};

const CategoriesTable = ({ categories }: ComponentProps) => {
  const router = useRouter();

  return (
    <div className="max-w-6xl mt-8">
      <table className="w-full shadow text-left bg-white dark:bg-gray-800">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-700">
            <th className="py-5 sm:pl-10 pl-2 w-1/4 text-base text-gray-800 dark:text-gray-100">
              ID
            </th>
            <th className="py-5 w-1/4 text-base text-gray-800 dark:text-gray-100">
              Title
            </th>

            <th className="py-5 w-1/4 text-base text-gray-800 dark:text-gray-100 pr-2 sm:pr-10 text-right">
              Image
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              onClick={() => router.push(`/admin/categories/${category.slug}`)}
              className="odd:bg-slate-50 even:bg-slate-200 cursor-pointer"
            >
              <td className="sm:pl-10 pl-2 pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">
                {category.slug}
              </td>
              <td className="pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">
                {category.name}
              </td>

              <td className="py-5 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right">
                <img
                  src={category.image.src}
                  className="h-10 object-contain"
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  alt={category.name!}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CategoriesTable;
