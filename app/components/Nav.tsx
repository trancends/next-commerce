"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store";
import { AiFillShopping } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import DarkLight from "./DarkLight";

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();
  return (
    <nav className="flex items-center justify-between py-8">
      <Link href={"/"}>
        <h1>Styled</h1>
      </Link>
      <ul className="flex items-center gap-8">
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
        <DarkLight />
        {/* if the user is not signed in */}
        {!user && (
          <li className="rounded-md bg-primary px-4 py-2 text-white">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <li>
            <div className="dropdown-end dropdown cursor-pointer">
              <Image
                tabIndex={0}
                src={user?.image as string}
                width={48}
                height={48}
                alt={user?.name as string}
                className="rounded-full"
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => {
                      if (document.activeElement instanceof HTMLAnchorElement) {
                        document.activeElement.blur();
                      }
                    }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li
                  onClick={() => {
                    signOut();
                    if (document.activeElement instanceof HTMLAnchorElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  <span>Sign Out</span>
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
