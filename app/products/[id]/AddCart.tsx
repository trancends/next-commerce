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

  const handdleAddToCart = () => {
    cartStore.addProduct({ id, name, image, unit_amount, quantity });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <>
      <button
        onClick={handdleAddToCart}
        disabled={added}
        className="btn-primary btn my-4 w-full"
      >
        {added ? "Added to cart" : "Add to cart"}
      </button>
    </>
  );
}
