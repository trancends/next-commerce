"use client";
// Hydration function component

import { ReactNode, useEffect, useState } from "react";
import { useThemeStore } from "@/store";

/**
 * Renders the children components after NextJs rehydration completes, showing a loading
 * message until then.
 *
 * @param {ReactNode} children - the child components to be rendered
 * @return {JSX.Element} - the hydrated components or a loading message
 */

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setHydrated] = useState(false);
  const themeStore = useThemeStore();
  // Wait till NextJs rehydration completes
  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <>
      {isHydrated ? (
        <div
          data-theme={themeStore.mode}
          className=" h-full px-4 font-roboto lg:px-20"
        >
          {children}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
