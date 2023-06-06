import { SearchParamType } from "@/types/SearchParamType";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";

export default async function Product({ searchParams }: SearchParamType) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 items-center justify-between gap-16">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={384}
        height={384}
        // className="w-6/12 h-96 object-cover rounded-lg"
      />

      <div className="font-medium">
        <h1 className="text-2xl" py-2>
          {searchParams.name}
        </h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div>
          <p className="text-teal-700 ">
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </p>
          <button className="my-4 bg-teal-700 text-slate-100 w-3/12 rounded-md p-2">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
