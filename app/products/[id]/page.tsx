import { SearchParamType } from "@/types/SearchParamType";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";
import AddCart from "./AddCart";

export default async function Product({ searchParams }: SearchParamType) {
  return (
    <div className="grid items-center justify-between justify-items-center gap-16 md:grid-cols-2">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={384}
        height={384}
        // className="w-6/12 h-96 object-cover rounded-lg"
      />

      <div className="font-medium">
        <h1 className="py-2 text-2xl">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div>
          <p className="font-bold text-primary">
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </p>
          <AddCart {...searchParams} />
        </div>
      </div>
    </div>
  );
}
