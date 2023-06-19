"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store";
import { AiFillShopping } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();
  return (
    <nav className="flex items-center justify-between py-8">
      <Link href={"/"}>
        <h1>Styled</h1>
      </Link>
      <ul className="flex items-center gap-12">
        {/* if the user is not signed in */}
        <li>Products</li>
        {/* Toogle cart button */}
        <li
          onClick={() => cartStore.toggleCart()}
          className="relative flex cursor-pointer items-center text-3xl"
        >
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="absolute bottom-4 left-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {!user && (
          <li className="rounded-md bg-primary px-4 py-2 text-white">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <div>
            <Link href={"/dashboard"}>
              <li>
                <Image
                  src={user?.image as string}
                  width={48}
                  height={48}
                  alt={user?.name as string}
                  className="rounded-full"
                />
              </li>
            </Link>
          </div>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
