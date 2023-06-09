"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import basket from "@/public/basket.png";
import { motion } from "framer-motion";

export default function Cart() {
  const cartStore = useCartStore();

  // Total price
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed left-0 top-0 h-screen w-full bg-black/25"
    >
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-screen w-1/3 overflow-scroll bg-white p-12"
      >
        <h1>Here's your shopping list 📜 </h1>
        {cartStore.cart.map((item) => (
          <motion.div layout key={item.id} className="flex gap-4 py-4">
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
          </motion.div>
        ))}
        {/* Checkout and total */}

        {cartStore.cart.length > 0 && (
          <motion.div layout>
            <p>Total: {formatPrice(totalPrice)}</p>
            <button className="mt-4 w-full rounded-md bg-teal-700 py-2 text-white">
              Checkout
            </button>
          </motion.div>
        )}
        {!cartStore.cart.length && (
          <motion.div
            animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
            initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
            exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
            className="flex flex-col items-center gap-12 pt-56 text-2xl font-medium opacity-75"
          >
            <h1>Uhhh... it's empty 🥲</h1>
            <Image src={basket} alt="empty cart" width={200} height={200} />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
