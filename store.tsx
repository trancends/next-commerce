import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = = create()(
    persist(
        (set) => ({
        items: [],
        isOpen: false,
    }))
) 