"use client";
// Hydration function component

import { ReactNode, useEffect, useState } from "react";

/**
 * Renders the children components after NextJs rehydration completes, showing a loading
 * message until then.
 *
 * @param {ReactNode} children - the child components to be rendered
 * @return {JSX.Element} - the hydrated components or a loading message
 */

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setHydrated] = useState(false);

  // Wait till NextJs rehydration completes
  useEffect(() => {
    setHydrated(true);
  }, []);
  return <>{isHydrated ? <>{children}</> : <div>Loading...</div>}</>;
}
