
import { Database } from "../../db_types";
import { useRouter } from "next/router";

type Occasion = Database["public"]["Tables"]["occasion"]["Row"];

type ComponentProps = {
  occasions: Occasion[];
};

const OccasionsTable = ({occasions}:ComponentProps) => {

  const router = useRouter()



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
          {occasions.map((occasion) => (
            <tr
              key={occasion.id}
              onClick={() => router.push(`/admin/occasions/${occasion.slug}`)}
              className="odd:bg-slate-50 even:bg-slate-200 cursor-pointer"
            >
              <td className="sm:pl-10 pl-2 pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">
                {occasion.slug}
              </td>
              <td className="pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">
                {occasion.title}
              </td>

              <td className="py-5 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right">
                <img
                  src={occasion.image.url}
                  className="h-10 object-contain"
                  alt={occasion.slug}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default OccasionsTable;
