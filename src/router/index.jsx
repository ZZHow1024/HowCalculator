import { createHashRouter } from "react-router-dom";

import App from "@/App.jsx";
import { lazy, Suspense } from "react";
import Home from "@/pages/Home";

const BoothMultiplicationCalculator = lazy(
  () => import("@/pages/BoothMultiplicationCalculator"),
);
const SignMagnitudeMultiplicationCalculator = lazy(
  () => import("@/pages/SignMagnitudeMultiplicationCalculator"),
);
const MemoryAddressDataCalculator = lazy(
  () => import("@/pages/MemoryAddressDataCalculator"),
);
const NumberBaseConversion = lazy(() => import("@/pages/NumberBaseConversion"));
const CodeConversion = lazy(() => import("@/pages/CodeConversion"));

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/sign-magnitude-multiplication-calculator",
        element: (
          <Suspense fallback={"加载中"}>
            <SignMagnitudeMultiplicationCalculator />
          </Suspense>
        ),
      },
      {
        path: "/booth-multiplication-calculator",
        element: (
          <Suspense fallback={"加载中"}>
            <BoothMultiplicationCalculator />
          </Suspense>
        ),
      },
      {
        path: "/memory-address-data-calculator",
        element: (
          <Suspense fallback={"加载中"}>
            <MemoryAddressDataCalculator />
          </Suspense>
        ),
      },
      {
        path: "/number-base-conversion",
        element: (
          <Suspense fallback={"加载中"}>
            <NumberBaseConversion />
          </Suspense>
        ),
      },
      {
        path: "/code-conversion",
        element: (
          <Suspense fallback={"加载中"}>
            <CodeConversion />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
