import Image from "next/image";

import formatCurrency from "../../lib/formatCurrency";
import { Database } from "../../schema";

type ComponentProps = {
  bundle: Database['public']['Tables']['bundles']['Row']
}

const Bundle = ({bundle}:ComponentProps) => {
  return (
    <article className="w-full">
      <Image
        src={bundle.main_image.url}
        width={bundle.main_image.width}
        height={bundle.main_image.height}
        alt={bundle.title}
        className="w-full aspect-square rounded-md shadow-md"
      />
      <div className="py-4 ">
        <p className="text-sm md:text-md lg:text-lg text-primary-main font-medium">
          {bundle.title}
        </p>

        <h2 className="text-xl lg:text-2xl text-primary-main mt-1 font-bold">
          {formatCurrency(bundle.price)}
        </h2>
      </div>
    </article>
  );
};
export default Bundle;
