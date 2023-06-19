"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import vibing from "@/public/vibing.gif";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {
  const cartStore = useCartStore();

  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
  }, []);

  const checkoutOrder = () => {
    setTimeout(() => {
      cartStore.setCheckout("cart");
    }, 1000);
    cartStore.toggleCart();
  };

  return (
    <motion.div
      className="my-12 flex items-center justify-center"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="rounded-md px-12 text-center">
        <h1 className="text-xl font-medium">Your order has been placed 🚀</h1>
        <h2 className="my-4 text-sm">Check your email for the receipt.</h2>
        <Image src={vibing} className="py-8" alt="vibing" priority={true}/>

        <div className="flex items-center justify-center gap-12">
          <Link href={"/dashboard"}>
            <button onClick={checkoutOrder} className="font-medium">
              Check your Order
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
