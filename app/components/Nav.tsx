"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store";
import { AiFillShopping } from "react-icons/ai";

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
        <li className="relative flex cursor-pointer items-center text-3xl">
          <AiFillShopping />
          <span className="absolute bottom-4 left-4 flex h-5 w-5 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
            {cartStore.cart.length}
          </span>
        </li>
        {!user && (
          <li className="rounded-md bg-teal-600 px-4 py-2 text-white">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <div>
            <li>
              <Image
                src={user?.image as string}
                width={48}
                height={48}
                alt={user?.name as string}
                className="rounded-full"
              />
            </li>
          </div>
        )}
      </ul>
      {cartStore.isOpen && <Cart />}
    </nav>
  );
}
