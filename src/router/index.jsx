import { createHashRouter } from "react-router-dom";

import App from "@/App.jsx";
import { lazy, Suspense } from "react";
import Home from "@/pages/Home";

const BoothMultiplicationCalculator = lazy(
  () => import("@/pages/BoothMultiplicationCalculator"),
);
const NumberBaseConversion = lazy(() => import("@/pages/NumberBaseConversion"));
const SignMagnitudeMultiplicationCalculator = lazy(
  () => import("@/pages/SignMagnitudeMultiplicationCalculator"),
);

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
        path: "/number-base-conversion",
        element: (
          <Suspense fallback={"加载中"}>
            <NumberBaseConversion />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
