"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";

export default function Cart() {
  const cartStore = useCartStore();

  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className="fixed left-0 top-0 h-screen w-full bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-screen w-1/3 overflow-scroll bg-white p-12"
      >
        <h1>Here's your shopping list 📜 </h1>
        {cartStore.cart.map((item) => (
          <div className="flex gap-4 py-4">
            <Image
              src={item.image}
              width={120}
              height={120}
              alt={item.name}
              className="h-24 rounded-md"
            />
            <div>
              <h2>{item.name}</h2>
              {/* Update quantity of a item */}
              <div className="flex gap-2">
                <h2>Quantity: {item.quantity}</h2>
                <button
                  onClick={() =>
                    cartStore.removeProduct({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    })
                  }
                >
                  <IoRemoveCircle />
                </button>
                <button
                  onClick={() => {
                    cartStore.addProduct({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    });
                  }}
                >
                  <IoAddCircle />
                </button>
              </div>
              <p className="text-sm">
                {item.unit_amount && formatPrice(item.unit_amount)}
              </p>
            </div>
          </div>
        ))}
        <button className="mt-4 w-full rounded-md bg-teal-700 py-2 text-white">
          Checkout
        </button>
      </div>
    </div>
  );
}
