"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";
import { useState } from "react";

export default function AddCart({
  name,
  id,
  image,
  unit_amount,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handdleAddToCart = () => {};

  return (
    <>
      <button
        onClick={() => {
          cartStore.addProduct({ id, name, image, unit_amount, quantity });
        }}
        className="my-12 rounded-md bg-teal-700 px-6 py-2 font-medium text-white"
      >
        Add to cart
      </button>
    </>
  );
}
