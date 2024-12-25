import { useState, useMemo } from "react";
import { Router } from "@toolpad/core/AppProvider";

export function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = useState(initialPath);

  return useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    }),
    [pathname]
  );
}
