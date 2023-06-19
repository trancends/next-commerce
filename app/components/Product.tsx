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
    <div>
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
          className="h-96 w-full rounded-lg object-cover"
        />
      </Link>
      <div className="py-2 font-medium">
        <h1>{name}</h1>
        <h2 className="text-sm text-primary">
          {unit_amount !== null ? formatPrice(unit_amount) : "N/A"}
        </h2>
      </div>
    </div>
  );
}
