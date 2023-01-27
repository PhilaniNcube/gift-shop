import Image from "next/image";
import Link from "next/link";

type ComponentProps = {
  categories: ICategory[];
};

const CategoriesGrid = ({ categories }:ComponentProps) => {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="relative isolate aspect-video object-cover w-full rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
              <Image
                src={category.image.src}
                width={category.image.width}
                height={category.image.height}
                alt={category.name}
                className="w-full aspect-square object-cover"
              />
              <div className="bg-slate-400/40 hover:bg-slate-600/30 absolute inset-0 flex justify-start items-end p-5">
                 <h3 className="text-slate-900 font-medium text-lg px-6 py-2 bg-white/60 rounded">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CategoriesGrid;
