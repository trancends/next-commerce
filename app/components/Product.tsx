import Image from "next/image";
import { ProductType } from "@/types/ProductType";
import formatPrice from "@/util/PriceFormat";
import Link from "next/link";

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) {
  const { features } = metadata;

  return (
    <div className="text-gray-700">
      <Link
        href={{
          pathname: `/products/${id}`,
          query: { name, unit_amount, image, id, description, features },
        }}
      >
        <Image
          src={image}
          alt={name}
          width={384}
          height={384}
          className="w-full h-96 object-cover rounded-lg"
        />
      </Link>
      <div className="font-medium py-2">
        <h1>{name}</h1>
        <h2 className="text-sm ">
          {unit_amount !== null ? formatPrice(unit_amount) : "N/A"}
        </h2>
      </div>
    </div>
  );
}
