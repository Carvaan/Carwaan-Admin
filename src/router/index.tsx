import { FC } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Ratings from "../pages/Ratings";

const Index: FC = () => {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <Navigate to={"/verify"} />,
        },
        {
          path: "verify",
          element: <Home />,
        },
        {
          path: "ratings",
          children: [
            {
              path: "*",
              element: <Ratings />,
            },
          ],
        },
        {
          path: "*",
          element: <Navigate to={"/verify"} />,
        },
      ],
    },
  ]);
};

export default Index;
