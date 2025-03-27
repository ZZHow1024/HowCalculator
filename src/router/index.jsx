import { createBrowserRouter } from "react-router-dom";

import BoothMultiplicationCalculator from "@/pages/BoothMultiplicationCalculator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BoothMultiplicationCalculator />,
  },
]);

export default router;
